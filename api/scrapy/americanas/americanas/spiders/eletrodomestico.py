import scrapy

class MlSpider(scrapy.Spider):
    name = 'eletro'
    start_urls = [
        # Eletrodoméstico
        'https://www.americanas.com.br/categoria/eletrodomesticos/geladeira-refrigerador?chave=pfm_hm_tt_1_0_geladeira-refrigerador&viewMode=list',
        'https://www.americanas.com.br/categoria/ar-condicionado-e-aquecedores/aquecedores-de-ar?chave=pfm_hm_tt_1_0_aquecedores',
        'https://www.americanas.com.br/categoria/eletrodomesticos/micro-ondas?chave=pfm_hm_tt_1_0_micro-ondas&viewMode=list',
        'https://www.americanas.com.br/categoria/eletrodomesticos/fogao?chave=pfm_hm_tt_1_0_fogao&viewMode=list',
        'https://www.americanas.com.br/categoria/eletrodomesticos/maquina-de-lavar?chave=pfm_hm_tt_1_0_maquina-de-lavar&viewMode=list',
        'https://www.americanas.com.br/categoria/eletrodomesticos/lava-e-seca?chave=pfm_hm_tt_1_0_lava-e-seca&viewMode=list',
        'https://www.americanas.com.br/categoria/ar-condicionado-e-aquecedores/ar-condicionado-split?chave=pc_cat_mt3_1_acom_home_ar_condicionado',
        'https://www.americanas.com.br/categoria/ar-condicionado-e-aquecedores/ventilador-e-circulador-de-ar?chave=pc_cat_mt3_5_acom_home_ar_condicionado',
        'https://www.americanas.com.br/categoria/eletrodomesticos/cooktop?chave=pfm_hm_tt_1_0_cooktop&viewMode=list',
        'https://www.americanas.com.br/categoria/eletrodomesticos/freezer?chave=pfm_hm_tt_1_0_freezer&viewMode=list',
        'https://www.americanas.com.br/categoria/eletrodomesticos/forno-de-embutir?chave=pfm_hm_tt_1_0_forno-de-embutir&viewMode=list',
        'https://www.americanas.com.br/categoria/eletroportateis/forno-eletrico?chave=pfm_hm_tt_1_0_forno-eletrico&viewMode=list'
        'https://www.americanas.com.br/categoria/eletrodomesticos/lava-loucas?chave=pfm_hm_tt_1_0_lava-loucas&viewMode=list',
        'https://www.americanas.com.br/categoria/eletrodomesticos/coifa-e-depurador?viewMode=list',
        'https://www.americanas.com.br/categoria/eletrodomesticos/cervejeira?chave=pfm_hm_tt_1_0_cervejeira&viewMode=list',
        'https://www.americanas.com.br/categoria/tv-e-home-theater/acessorios-para-tv-e-video?chave=pfm_hm_tt_1_0_acessorios-para-tv-e-video&viewMode=list',
        'https://www.americanas.com.br/categoria/tv-e-home-theater/tv?chave=pfm_hm_tt_1_0_tv&viewMode=list',
        'https://www.americanas.com.br/categoria/eletroportateis/fritadeira-eletrica?chave=pfm_hm_tt_1_0_fritadeira-eletrica&viewMode=list',
        'https://www.americanas.com.br/categoria/eletroportateis/aspirador-de-po?chave=pfm_hm_tt_1_0_aspirador-de-po&viewMode=list'
        'https://www.americanas.com.br/categoria/eletroportateis/cafeteira?chave=pfm_hm_tt_1_0_cafeteira&viewMode=list',
        'https://www.americanas.com.br/categoria/eletroportateis/liquidificador?chave=pfm_hm_tt_1_0_liquidificador&viewMode=list',
        'https://www.americanas.com.br/categoria/eletroportateis/maquina-de-costura?chave=pfm_hm_tt_1_0_maquina-de-costura&viewMode=list',
        'https://www.americanas.com.br/categoria/eletroportateis/processador-de-alimentos?chave=pfm_hm_tt_1_0_processador-de-alimentos&viewMode=list'
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