import scrapy

class MlSpider(scrapy.Spider):
    name = 'aces'

    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'ROBOTSTXT_OBEY': False,
        'DEFAULT_REQUEST_HEADERS': {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Referer': 'https://www.google.com/',
        }
    }

    start_urls = [
        # Acessórios
        'https://www.centauro.com.br/busca/pulseira',
        'https://www.centauro.com.br/busca/anel',
        'https://www.centauro.com.br/busca/capacete',
        'https://www.centauro.com.br/busca/teclado',
        'https://www.centauro.com.br/busca/boné',
        'https://www.centauro.com.br/busca/bolsa',
        'https://www.centauro.com.br/busca/mochila',
        'https://www.centauro.com.br/busca/relogio',
        'https://www.centauro.com.br/busca/oculos-de-sol',
        'https://www.centauro.com.br/busca/fones-de-ouvido',
        'https://www.centauro.com.br/busca/carteira',
        'https://www.centauro.com.br/busca/cinto',
        'https://www.centauro.com.br/busca/chaveiro'
        ]

def parse(self, response, **kwargs):
        # Seleciona cada cartão de produto usando o data-testid (muito mais estável)
        cards = response.xpath('//div[@data-testid="grid-product-card-enhanced"]')

        for card in cards:
            # Extração dos campos usando data-testid
            title = card.xpath('.//span[@data-testid="product-name"]/text()').get(default='').strip()
            
            # O preço as vezes vem com texto extra, pegamos o texto direto do parágrafo
            price = card.xpath('.//p[@data-testid="price-current"]/text()').get(default='').strip()
            
            image = card.xpath('.//img[@data-testid="product-image"]/@src').get(default='').strip()
            
            # Pega o link do primeiro 'a' encontrado dentro do card
            link = card.xpath('.//a/@href').get(default='').strip()

            # Tratamento do Link (Adicionar domínio se for relativo)
            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.centauro.com.br{link}'

            # Verificação básica se temos os dados essenciais
            if title and link:
                yield {
                    'preço': price if price else 'Indisponível',
                    'título': title,
                    'link': link,
                    'loja': 'centauro',
                    'estrelas': '0.0',   # Não presente no HTML fornecido, mantido padrão
                    'avaliações': 'sem', # Não presente no HTML fornecido, mantido padrão
                    'imagem': image
                }