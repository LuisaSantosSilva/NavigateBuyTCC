import scrapy

class MlSpider(scrapy.Spider):
    name = 'esporte'
    start_urls = [        
        # Esporte
        'https://www.americanas.com.br/categoria/esporte-e-lazer/futebol?chave=pc_cat_ct1_3_acom_home_esporteelazer-futebol',
        'https://www.americanas.com.br/categoria/esporte-e-lazer/volei?chave=pc_cat_ct1_8_acom_home_esporteelazer-volei',
        'https://www.americanas.com.br/categoria/esporte-e-lazer/basquete?chave=pc_cat_ct1_13_acom_home_esporteelazer-basquete',
        'https://www.americanas.com.br/categoria/esporte-e-lazer/bicicletas?chave=pc_cat_ct1_2_acom_home_esporteelazer-bicicletas',
        'https://www.americanas.com.br/categoria/esporte-e-lazer/jogos-de-mesa-e-salao?chave=pc_cat_ct1_11_acom_home_esporteelazer-jogos-de-mesa',
        'https://www.americanas.com.br/categoria/esporte-e-lazer/tenis-squash-e-badminton?chave=pc_cat_ct1_10_acom_home_esporteelazer-tenis-squash-e-badminton',
        'https://www.americanas.com.br/categoria/esporte-e-lazer/pesca?chave=pc_cat_ct1_9_acom_home_esporteelazer-pesca',
        'https://www.americanas.com.br/categoria/esporte-e-lazer/musculacao-e-fitness/halter?chave=pc_cat_mt1_7_acom_menu_musculacao_fitness',
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