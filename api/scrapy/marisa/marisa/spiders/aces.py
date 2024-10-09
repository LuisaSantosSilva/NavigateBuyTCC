import scrapy

class MrsSpider(scrapy.Spider):
    name = 'aces'
    start_urls = [
        # Acessórios
        "https://www.marisa.com.br/acessorios/feminino/c/bolsas",
        "https://www.marisa.com.br/acessorios/feminino/c/carteiras",
        "https://www.marisa.com.br/acessorios/feminino/c/cintos",
        "https://www.marisa.com.br/acessorios-m/masculino/c/cintos-m",
        "https://www.marisa.com.br/acessorios/feminino/c/oculos",
        "https://www.marisa.com.br/acessorios-m/masculino/c/oculos-m",
        "https://www.marisa.com.br/acessorios/feminino/c/relogios",
        "https://www.marisa.com.br/masculino/c/relogios-m",
        "https://www.marisa.com.br/acessorios/feminino/c/bijuterias",
        "https://www.marisa.com.br/acessorios/feminino/c/necessaire",
        "https://www.marisa.com.br/acessorios-m/masculino/c/bones-m",
        "https://www.marisa.com.br/meninas/infantil/c/acessorios-infantil-meninas",
        "https://www.marisa.com.br/meninos/infantil/c/acessorios-meninos",
        ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[contains(@class, "js-product-column")]'):

            link = response.urljoin(i.xpath('.//div[@class="thumb-wrapper"]/a/@href').get(default=''))

            yield {
                'preço': i.xpath('.//span[@itemprop="price"]/text()').get(default='').strip(),
                'título': i.xpath('.//h3[contains(@class, "product-title")]/a/text()').get(default='').strip(),
                'link': link,
                'loja': 'marisa',
                'estrelas': i.xpath('.//div[contains(@class, "avg-rating")]/text()').get(default='0.0').strip(),
                'avaliações': i.xpath('.//div[contains(@class, "review-count")]/text()').get(default='sem').strip(),
                'imagem': i.xpath('.//meta[@itemprop="image"]/@content').get(default=''),
            }