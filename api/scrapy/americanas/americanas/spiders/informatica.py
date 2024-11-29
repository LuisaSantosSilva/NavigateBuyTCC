import scrapy

class MlSpider(scrapy.Spider):
    name = 'info'
    start_urls = [
        # Informática
        'https://www.americanas.com.br/categoria/celulares-e-smartphones/smartphone?chave=pfm_hm_tt_1_0_smartphone&viewMode=list',
        'https://www.americanas.com.br/categoria/celulares-e-smartphones/celular-basico?chave=pfm_hm_tt_1_0_celular-basico&viewMode=list',
        'https://www.americanas.com.br/categoria/celulares-e-smartphones/smartphone/iphone?ordenacao=topSelling&viewMode=list&chave=pfm_hm_tt_1_0_iphones',
        'https://www.americanas.com.br/categoria/informatica/notebooks?chave=pfm_hm_tt_1_0_notebook&viewMode=list',
        'https://www.americanas.com.br/categoria/informatica/notebooks/notebook-gamer?viewMode=list',
        'https://www.americanas.com.br/categoria/informatica/computadores/computador-desktop?viewMode=list',
        'https://www.americanas.com.br/categoria/informatica/computadores/computador-gamer?viewMode=list',
        'https://www.americanas.com.br/categoria/informatica/tablet-e-ipad/tablet?chave=pfm_hm_tt_1_0_tablet&viewMode=list',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/impressora-e-multifuncional?chave=pc_cat_mt3_1_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/suprimentos-para-impressora/cartucho?chave=pc_cat_mt3_7_acom_home_informatica,'
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/perifericos?chave=pc_cat_mt3_3_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/perifericos/teclado?chave=pc_cat_ct3_2_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/monitor?chave=pc_cat_mt3_4_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/projetores?chave=pc_cat_mt3_5_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/componentes?chave=pc_cat_mt3_6_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/equipamento-de-rede-wireless/roteador?chave=pc_cat_mt3_13_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/perifericos/microfone?chave=pc_cat_ct3_9_acom_home_informatica',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/perifericos/webcam?chave=pc_cat_ct3_8_acom_home_informatica',
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