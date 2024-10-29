from scrapy_selenium import SeleniumRequest
import scrapy

class MySpider(scrapy.Spider):
    name = 'RA'

    def __init__(self, produto=None, loja=None, *args, **kwargs):
        super(MySpider, self).__init__(*args, **kwargs)
        self.produto = produto
        self.loja = loja

        self.lojas_urls = {            
            'americanas': 'https://www.reclameaqui.com.br/empresa/americanas-marketplace/lista-reclamacoes/?busca={produto}&pagina=1',
            'centauro': 'https://www.reclameaqui.com.br/empresa/centauro-loja-fisica/lista-reclamacoes/?busca={produto}&pagina=1',
            'magazine luiza': 'https://www.reclameaqui.com.br/empresa/magazine-luiza-loja-online/lista-reclamacoes/?busca={produto}&pagina=1',
            'marisa': 'https://www.reclameaqui.com.br/empresa/lojas-marisa-loja-online/lista-reclamacoes/?busca={produto}&pagina=1',
            'mercado livre': 'https://www.reclameaqui.com.br/empresa/mercado-livre/lista-reclamacoes/?busca={produto}&pagina=1',
        }

    def normalizar_loja_nome(self, loja_nome):
        return loja_nome.lower()

    def start_requests(self):
        if self.loja:
            loja_normalizada = self.normalizar_loja_nome(self.loja)
            loja_url = self.lojas_urls.get(loja_normalizada)
            if loja_url:
                url = loja_url.format(produto=self.produto)
                self.logger.info(f'URL gerada: {url}')
                yield SeleniumRequest(url=url, callback=self.parse, meta={'loja': loja_normalizada}, wait_time=5)
            else:
                self.logger.error(f'Loja "{self.loja}" não encontrada.')
        else:
            for loja, url_template in self.lojas_urls.items():
                url = url_template.format(produto=self.produto)
                yield SeleniumRequest(url=url, callback=self.parse, meta={'loja': loja}, wait_time=5)

    def parse(self, response):
        
        loja = response.meta.get('loja')

        for item in response.css('div.sc-1pe7b5t-0'):
            link = item.css('a::attr(href)').get(default='').strip()

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.reclameaqui.com.br{link}'

            yield {
                'titulo': item.css('h4.sc-1pe7b5t-1::text').get(default='').strip(),
                'descricao': item.css('p.sc-1pe7b5t-2::text').get(default='').strip(),
                'status': item.css('span.sc-1pe7b5t-4::text').get(default='').strip(),
                'tempo': item.css('span.sc-1pe7b5t-5::text').get(default='').strip(),
                'link': link,
                'loja': loja
            }
