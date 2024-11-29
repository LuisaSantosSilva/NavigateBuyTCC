import scrapy

class MlSpider(scrapy.Spider):
    name = 'MF'
    start_urls = [        
        # Mercado/Farmácia
        'https://www.americanas.com.br/categoria/mercado/alimentos?chave=pc_cat_menu_mercearia_mercado',
        'https://www.americanas.com.br/categoria/mercado/bebidas/bebidas-nao-alcoolicas?chave=pc_cat_menu_bebidas_na_mercado',
        'https://www.americanas.com.br/categoria/mercado/bebidas/bebidas-alcoolicas?chave=pc_cat_menu_bebidas_a_mercado',
        'https://www.americanas.com.br/categoria/mercado/bomboniere?chave=pc_cat_menu_bombiniere_mercado',
        'https://www.americanas.com.br/categoria/mercado/higiene-e-saude?chave=pc_cat_mt3_acom_belezaeperfumaria-higiene',
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