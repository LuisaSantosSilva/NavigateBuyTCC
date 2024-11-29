import scrapy

class MlSpider(scrapy.Spider):
    name = 'sapato'
    start_urls = [
        # Sapato
        'https://www.americanas.com.br/categoria/moda/calcados/tenis/feminino?chave=pc_cat_mt1_1_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/sandalia/feminina?chave=pc_cat_mt1_3_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/bota/feminina?chave=pc_cat_mt1_5_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/sapato/feminino?chave=pc_cat_mt1_7_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/chinelo/feminino?chave=pc_cat_mt1_9_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/tenis/masculino?chave=pc_cat_mt1_2_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/sandalia/masculina?chave=pc_cat_mt1_4_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/bota/masculina?chave=pc_cat_mt1_6_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/sapato/masculino?chave=pc_cat_mt1_8_acom_calcados',
        'https://www.americanas.com.br/categoria/moda/calcados/chinelo/masculino?chave=pc_cat_mt1_10_acom_calcados'
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