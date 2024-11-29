import scrapy

class MlSpider(scrapy.Spider):
    name = 'decoracao'
    start_urls = [
        # Decoração
        'https://www.americanas.com.br/categoria/decoracao/quadro?chave=pc_cat_mt2_5_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/objetos-decorativos/artigos-religiosos?chave=pc_cat_mt2_1_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/objetos-decorativos/aparador-de-livros?chave=pc_cat_mt2_2_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/luminaria/pendente?chave=pc_cat_mt2_3_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/objetos-decorativos/azulejos-decorativos?chave=pc_cat_mt2_4_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/almofadas-e-capas?chave=pc_cat_mt2_6_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/porta-retrato?chave=pc_cat_mt2_8_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/bandeja-para-sofa?chave=pc_cat_mt2_9_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/decoracao/cabideiro?chave=pc_cat_mt2_12_acom_home_decoracao',
        'https://www.americanas.com.br/categoria/moveis/quarto-e-colchao/guarda-roupa',
        'https://www.americanas.com.br/categoria/moveis/sala-de-estar/rack-com-painel',
        'https://www.americanas.com.br/categoria/moveis/sala-de-estar/sofa',
        'https://www.americanas.com.br/categoria/moveis/quarto-e-colchao/colchao',
        'https://www.americanas.com.br/categoria/moveis/quarto-e-colchao/cama',
        'https://www.americanas.com.br/categoria/moveis/escritorio/cadeiras-para-escritorio',
        'https://www.americanas.com.br/categoria/moveis/escritorio/mesas-para-escritorio',
        'https://www.americanas.com.br/categoria/moveis/sala-de-jantar?chave=pfm_hm_tt_1_0_sala-de-jantar',
        'https://www.americanas.com.br/categoria/moveis/sala-de-estar/cadeira?chave=pfm_hm_tt_1_0_cadeira',
        'https://www.americanas.com.br/categoria/moveis/sala-de-estar/poltrona',
        'https://www.americanas.com.br/categoria/moveis/cozinha/cozinha-modulada',
        'https://www.americanas.com.br/categoria/moveis/quarto-e-colchao/quarto-completo',
    ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[contains(@class, "col__StyledCol-sc-1snw5v3-0 ehOuCD theme-grid-col src__ColGridItem-sc-122lblh-1 cJnBan")]'):
            link = i.xpath('.//a[contains(@class, "inStockCard__Link")]/@href').get(default='').strip()
            #stars = len(i.xpath('.//div[contains(@class, "src__FilledStars")]'))

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.americanas.com.br{link}'

            yield {
                'preço': i.xpath('.//span[contains(@class, "styles__PromotionalPrice")]/text()').get(default='').strip(),
                'título': i.xpath('.//h3[contains(@class, "product-name")]/text()').get(default='').strip(),
                'link': link,
                'loja': 'americanas',
                #'estrelas': stars,
                'avaliações': i.xpath('.//span[contains(@class, "src__Count")]/text()').get(default='(0)').strip(),
                'imagem': i.xpath('.//img[contains(@class, "src__LazyImage")]/@src').get(default='').strip()
            }