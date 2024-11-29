import scrapy

class MlSpider(scrapy.Spider):
    name = 'aces'
    start_urls = [
        # Acessórios
        'https://www.americanas.com.br/categoria/celulares-e-smartphones/acessorios-para-celular?chave=pfm_hm_tt_1_0_acessorios-para-celular&viewMode=list',
        'https://www.americanas.com.br/categoria/celulares-e-smartphones/pecas-para-celular?chave=pfm_hm_tt_1_0_pecas-para-celular&viewMode=list',
        'https://www.americanas.com.br/categoria/celulares-e-smartphones/smartwatch-e-smartband?chave=pfm_hm_tt_1_0_smartwatch-e-smartband&viewMode=list',
        'https://www.americanas.com.br/categoria/informatica-e-acessorios/acessorios-e-pecas-para-notebook?chave=pc_cat_mt3_10_acom_home_informatica',
        'https://www.americanas.com.br/categoria/moda/joias-e-semi-joias?chave=pc_cat_mt3_12_acom_home_moda',
        'https://www.americanas.com.br/categoria/papelaria/material-escolar/mochilas-e-lancheiras/kit-lancheira-e-mochila'
    ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[contains(@class, "col__StyledCol-sc-1snw5v3-0 qYCYL theme-grid-col")]'):
            link = i.xpath('.//div[contains(@class, "src__Wrapper-sc-1wgxjb2-0 dUUAKQ")]//a/@href').get(default='').strip()
            #stars = len(i.xpath('.//div[contains(@class, "src__FilledStars")]'))

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.americanas.com.br{link}'


            yield {
                'preço': i.xpath('.//span[contains(@class, "styles__PromotionalPrice")]/text()').get(default='').strip(),
                'título': i.xpath('.//h3[contains(@class, "product-name")]/text()').get(default='').strip(),
                'link': link,
                'loja': 'americanas',
                #'estrelas': stars,
                'avaliações': i.xpath('.//span[contains(@class, "src__Count")]/text()').get(default='0').strip(),
                'imagem': i.xpath('.//img[contains(@class, "src__LazyImage")]/@src').get(default='').strip()
            }