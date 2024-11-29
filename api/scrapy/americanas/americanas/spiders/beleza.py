import scrapy

class MlSpider(scrapy.Spider):
    name = 'beleza'
    start_urls = [
        # Beleza
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/dermocosmeticos/face?chave=pc_cat_mt3_acom_belezaeperfumaria-dermocosmeticos',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/cabelos?chave=pc_cat_mt3_acom_belezaeperfumaria-cabelo',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/perfumes?chave=pc_cat_mt3_acom_belezaeperfumaria-perfumes',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/cabelos/aparelhos-eletricos?chave=pc_cat_mt3_acom_belezaeperfumaria-eletroportateis',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/maquiagem?chave=pc_cat_mt3_acom_belezaeperfumaria-maquiagem',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/cuidados-com-a-pele/corpo?chave=pc_cat_mt3_acom_belezaeperfumaria-corpo',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/unhas?chave=pc_cat_mt3_acom_belezaeperfumaria-unhas',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/barbearia?chave=pc_cat_mt3_acom_belezaeperfumaria-barbearia',
        'https://www.americanas.com.br/categoria/beleza-e-perfumaria/depilacao?chave=pc_cat_mt3_acom_belezaeperfumaria-depilacao'
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