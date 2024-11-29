import scrapy

class MlSpider(scrapy.Spider):
    name = 'papelaria'
    start_urls = [
        # Papelaria
        'https://www.americanas.com.br/categoria/papelaria/cadernos?chave=pc_cat_mt3_1_acom_papelaria',
        'https://www.americanas.com.br/categoria/papelaria/ficharios?chave=pc_cat_mt3_14_acom_papelaria',
        'https://www.americanas.com.br/categoria/papelaria/planner-agenda-e-calendario/planner?chave=pc_cat_mt3_2_acom_papelaria',
        'https://www.americanas.com.br/categoria/papelaria/escrita-e-corretivos/lapis-lapiseiras-e-grafites?chave=pc_cat_mt3_6_acom_papelaria',
        'https://www.americanas.com.br/categoria/papelaria/canetas-e-canetinhas/canetinha',
        'https://www.americanas.com.br/categoria/papelaria/material-escolar/corte-cola-e-corretivo/apontador?chave=pc_cat_mt3_acom_papelaria-apontador',
        'https://www.americanas.com.br/categoria/papelaria/material-escolar/corte-cola-e-corretivo/borracha?chave=pc_cat_mt3_8_acom_papelaria',
        'https://www.americanas.com.br/categoria/papelaria/arte-desenho-e-pintura/regua-esquadro-transferidor',
        'https://www.americanas.com.br/categoria/papelaria/material-escolar/corte-cola-e-corretivo/cola?chave=pc_cat_mt3_acom_papelaria-cola',
        'https://www.americanas.com.br/categoria/papelaria/material-escolar/corte-cola-e-corretivo/tesoura-escolar?chave=pc_cat_mt3_10_acom_papelaria',
        'https://www.americanas.com.br/categoria/papelaria/estojos?chave=pc_cat_mt3_11_acom_papelaria',
        'https://www.americanas.com.br/categoria/papelaria/escrita-e-corretivos/corretivos?chave=pc_cat_mt3_acom_papelaria-corretivo',
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