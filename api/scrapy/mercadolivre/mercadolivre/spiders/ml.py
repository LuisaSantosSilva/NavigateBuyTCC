import scrapy
import re

class MlSpider(scrapy.Spider):
    name = 'ml'

    start_urls = [
        # Acessórios
        'https://lista.mercadolivre.com.br/pulseira',
        'https://lista.mercadolivre.com.br/anel',
        'https://lista.mercadolivre.com.br/capacete',
        'https://lista.mercadolivre.com.br/carregador',
        'https://lista.mercadolivre.com.br/mouse',
        'https://lista.mercadolivre.com.br/teclado',
        'https://lista.mercadolivre.com.br/bone',
        'https://lista.mercadolivre.com.br/bolsa',
        'https://lista.mercadolivre.com.br/mochila',
        'https://lista.mercadolivre.com.br/relogio',
        'https://lista.mercadolivre.com.br/oculos-de-sol',
        'https://lista.mercadolivre.com.br/fones-de-ouvido',
        'https://lista.mercadolivre.com.br/carteira',
        'https://lista.mercadolivre.com.br/colar',
        'https://lista.mercadolivre.com.br/cinto',
        'https://lista.mercadolivre.com.br/chaveiro',
        
        # Bebês
        'https://lista.mercadolivre.com.br/fralda',
        'https://lista.mercadolivre.com.br/chupeta',
        'https://lista.mercadolivre.com.br/mamadeira',
        'https://lista.mercadolivre.com.br/carrinho-de-bebe',
        'https://lista.mercadolivre.com.br/cadeirinha-para-carro',
        'https://lista.mercadolivre.com.br/babador',
        'https://lista.mercadolivre.com.br/termometro-infantil',
        'https://lista.mercadolivre.com.br/banheira-de-bebe',
        'https://lista.mercadolivre.com.br/mobile-para-berco',
        'https://lista.mercadolivre.com.br/lencos-umedecidos',
        'https://lista.mercadolivre.com.br/mordedor',
        'https://lista.mercadolivre.com.br/brinquedo-educativo',
        'https://lista.mercadolivre.com.br/tapete-de-atividades',
        'https://lista.mercadolivre.com.br/roupinha-de-bebe',
        'https://lista.mercadolivre.com.br/protetor-de-berco',
        
        # Beleza
        'https://lista.mercadolivre.com.br/shampoo',
        'https://lista.mercadolivre.com.br/condicionador',
        'https://lista.mercadolivre.com.br/mascara-de-hidratacao',
        'https://lista.mercadolivre.com.br/perfume',
        'https://lista.mercadolivre.com.br/sombra',
        'https://lista.mercadolivre.com.br/corretivo',
        'https://lista.mercadolivre.com.br/batom',
        'https://lista.mercadolivre.com.br/gloss',
        'https://lista.mercadolivre.com.br/base',
        'https://lista.mercadolivre.com.br/delineador',
        'https://lista.mercadolivre.com.br/bruma-fixadora',
        'https://lista.mercadolivre.com.br/esfoliante',
        'https://lista.mercadolivre.com.br/po-compacto',
        'https://lista.mercadolivre.com.br/hidratante-facial',
        'https://lista.mercadolivre.com.br/protetor-solar-facial',
        'https://lista.mercadolivre.com.br/blush',
        'https://lista.mercadolivre.com.br/primer',
        
        # Decoração
        'https://lista.mercadolivre.com.br/moldura',
        'https://lista.mercadolivre.com.br/tapete',
        'https://lista.mercadolivre.com.br/tinta',
        'https://lista.mercadolivre.com.br/quadro',
        'https://lista.mercadolivre.com.br/pintura',
        'https://lista.mercadolivre.com.br/fronha',
        'https://lista.mercadolivre.com.br/cobertor',
        'https://lista.mercadolivre.com.br/toalha',
        'https://lista.mercadolivre.com.br/vaso-decorativo',
        'https://lista.mercadolivre.com.br/almofada',
        'https://lista.mercadolivre.com.br/cortina',
        'https://lista.mercadolivre.com.br/abajur',
        'https://lista.mercadolivre.com.br/espelho-decorativo',
        'https://lista.mercadolivre.com.br/papel-de-parede',
        'https://lista.mercadolivre.com.br/porta-retrato',
        
        # Eletrodoméstico
        'https://lista.mercadolivre.com.br/geladeira',
        'https://lista.mercadolivre.com.br/micro-ondas',
        'https://lista.mercadolivre.com.br/fogao',
        'https://lista.mercadolivre.com.br/maquina-de-lavar-roupa',
        'https://lista.mercadolivre.com.br/lava-loucas',
        'https://lista.mercadolivre.com.br/ar-condicionado',
        'https://lista.mercadolivre.com.br/aspirador-de-po',
        'https://lista.mercadolivre.com.br/ferro-de-passar',
        'https://lista.mercadolivre.com.br/liquidificador',
        'https://lista.mercadolivre.com.br/batedeira',
        'https://lista.mercadolivre.com.br/torradeira',
        'https://lista.mercadolivre.com.br/cafeteira',
        'https://lista.mercadolivre.com.br/sanduicheira',
        'https://lista.mercadolivre.com.br/forno-eletrico',
        'https://lista.mercadolivre.com.br/televisao',
        
        # Esporte
        'https://lista.mercadolivre.com.br/bola',
        'https://lista.mercadolivre.com.br/raquete',
        'https://lista.mercadolivre.com.br/prancha',
        'https://lista.mercadolivre.com.br/bicicleta',
        'https://lista.mercadolivre.com.br/patins',
        'https://lista.mercadolivre.com.br/patinete',
        'https://lista.mercadolivre.com.br/bambole',
        'https://lista.mercadolivre.com.br/skate',
        'https://lista.mercadolivre.com.br/luva-de-boxe',
        'https://lista.mercadolivre.com.br/pesos-para-musculacao',
        'https://lista.mercadolivre.com.br/corda-de-pular',
        'https://lista.mercadolivre.com.br/barras-de-flexao',
        'https://lista.mercadolivre.com.br/esteira',
        'https://lista.mercadolivre.com.br/mascara-natacao',
#
        
        # Informática
        'https://lista.mercadolivre.com.br/celular',
        'https://lista.mercadolivre.com.br/computador',
        'https://lista.mercadolivre.com.br/video-game',
        'https://lista.mercadolivre.com.br/monitor',
        'https://lista.mercadolivre.com.br/impressora',
        'https://lista.mercadolivre.com.br/notebook',
        'https://lista.mercadolivre.com.br/tablet',
        'https://lista.mercadolivre.com.br/roteador',
        'https://lista.mercadolivre.com.br/switch',
        'https://lista.mercadolivre.com.br/placa-de-video',
        'https://lista.mercadolivre.com.br/teclado-mecanico',
        'https://lista.mercadolivre.com.br/ssd',
        'https://lista.mercadolivre.com.br/hd-externo',
        'https://lista.mercadolivre.com.br/mouse',
        'https://lista.mercadolivre.com.br/headset',
        
        # Lazer
        'https://lista.mercadolivre.com.br/baralho',
        'https://lista.mercadolivre.com.br/domino',
        'https://lista.mercadolivre.com.br/tirolesa-portatil',
        'https://lista.mercadolivre.com.br/tenda-de-acampamento',
        'https://lista.mercadolivre.com.br/uno',
        'https://lista.mercadolivre.com.br/binoculos',
        'https://lista.mercadolivre.com.br/isopor-termico',
        'https://lista.mercadolivre.com.br/rede-de-descanso',
        'https://lista.mercadolivre.com.br/guitarra',
        'https://lista.mercadolivre.com.br/teclado-musical',
        'https://lista.mercadolivre.com.br/equipamento-de-mergulho',
        
        # Mercado_Farmacia
        'https://lista.mercadolivre.com.br/sabonete',
        'https://lista.mercadolivre.com.br/pasta-de-dente',
        'https://lista.mercadolivre.com.br/escova-de-dente',
        'https://lista.mercadolivre.com.br/desinfetante',
        'https://lista.mercadolivre.com.br/esmalte',
        'https://lista.mercadolivre.com.br/algodao',
        'https://lista.mercadolivre.com.br/lamina-de-barbear',
        'https://lista.mercadolivre.com.br/sabao-em-po',
        'https://lista.mercadolivre.com.br/amaciante',
        'https://lista.mercadolivre.com.br/alcohol-em-gel',
        'https://lista.mercadolivre.com.br/repelente',
        'https://lista.mercadolivre.com.br/arroz',
        'https://lista.mercadolivre.com.br/feijao',
        'https://lista.mercadolivre.com.br/chocolate',
        'https://lista.mercadolivre.com.br/sorvete',
        
        # Papelaria
        'https://lista.mercadolivre.com.br/caderno',
        'https://lista.mercadolivre.com.br/caneta',
        'https://lista.mercadolivre.com.br/lapis',
        'https://lista.mercadolivre.com.br/borracha',
        'https://lista.mercadolivre.com.br/regua',
        'https://lista.mercadolivre.com.br/livro',
        'https://lista.mercadolivre.com.br/post-it',
        'https://lista.mercadolivre.com.br/grampeador',
        'https://lista.mercadolivre.com.br/fichario',
        'https://lista.mercadolivre.com.br/calculadora',
        'https://lista.mercadolivre.com.br/agenda',
        'https://lista.mercadolivre.com.br/clips-de-papel',
        'https://lista.mercadolivre.com.br/cola',
        'https://lista.mercadolivre.com.br/tesoura',
        'https://lista.mercadolivre.com.br/papel-sulfite',
        'https://lista.mercadolivre.com.br/marca-texto',
        
        # Pets
        'https://lista.mercadolivre.com.br/racao',
        'https://lista.mercadolivre.com.br/brinquedo-para-caes',
        'https://lista.mercadolivre.com.br/brinquedo-para-gatos',
        'https://lista.mercadolivre.com.br/caixa-de-areia',
        'https://lista.mercadolivre.com.br/arranhador',
        'https://lista.mercadolivre.com.br/comedouro',
        'https://lista.mercadolivre.com.br/bebedouro',
        'https://lista.mercadolivre.com.br/cama-para-caes',
        'https://lista.mercadolivre.com.br/cama-para-gatos',
        'https://lista.mercadolivre.com.br/tapete-higienico',
        'https://lista.mercadolivre.com.br/roupinha-para-pets',
        'https://lista.mercadolivre.com.br/coleira',
        'https://lista.mercadolivre.com.br/antipulgas',
        'https://lista.mercadolivre.com.br/casinha-para-cachorro',
        'https://lista.mercadolivre.com.br/escova-para-pelos',
        
        # Roupa
        'https://lista.mercadolivre.com.br/camiseta',
        'https://lista.mercadolivre.com.br/calca',
        'https://lista.mercadolivre.com.br/jaqueta',
        'https://lista.mercadolivre.com.br/moletom',
        'https://lista.mercadolivre.com.br/vestido',
        'https://lista.mercadolivre.com.br/shorts',
        'https://lista.mercadolivre.com.br/saia',
        'https://lista.mercadolivre.com.br/camisa-social',
        'https://lista.mercadolivre.com.br/blusa-de-frio',
        'https://lista.mercadolivre.com.br/calca-jeans',
        'https://lista.mercadolivre.com.br/legging',
        'https://lista.mercadolivre.com.br/bermuda',
        'https://lista.mercadolivre.com.br/roupa-intima',
        'https://lista.mercadolivre.com.br/pijama',
        'https://lista.mercadolivre.com.br/blazer',
        
        # Sapato
        'https://lista.mercadolivre.com.br/tenis',
        'https://lista.mercadolivre.com.br/salto',
        'https://lista.mercadolivre.com.br/sapatilha',
        'https://lista.mercadolivre.com.br/chinelo',
        'https://lista.mercadolivre.com.br/mocassim',
        'https://lista.mercadolivre.com.br/sandalia',
        'https://lista.mercadolivre.com.br/botas',
        'https://lista.mercadolivre.com.br/sapato-social',
        'https://lista.mercadolivre.com.br/sapato-esportivo',
        'https://lista.mercadolivre.com.br/pantufa',
        'https://lista.mercadolivre.com.br/tamanco',
        'https://lista.mercadolivre.com.br/rasteirinha',
       ]
    
    def parse(self, response, **kwargs):
        links_visitados = set()

        for i in response.xpath('//li[contains(@class, "ui-search-layout__item")]'):
            link = i.xpath('.//h2/a/@href').get(default='').strip()

            if link in links_visitados:
                continue

            links_visitados.add(link)
            
            normal_price = i.xpath('.//span[contains(@class, "andes-money-amount--cents-superscript") and not(ancestor::s)]')
            if normal_price:
                price = normal_price.xpath('.//span[@class="andes-money-amount__fraction"]/text()').get(default='').strip()
                cents = normal_price.xpath('.//span[@class="andes-money-amount__cents andes-money-amount__cents--superscript-24"]/text()').get(default='').strip()
            else:
                price = ''
                cents = ''

            promo_price = i.xpath('.//s[@class="andes-money-amount andes-money-amount--previous"]/span[@class="andes-money-amount__fraction"]/text()').get(default='').strip()
            promo_cents = i.xpath('.//s[@class="andes-money-amount andes-money-amount--previous"]/span[@class="andes-money-amount__cents"]/text()').get(default='').strip()

            image = i.xpath('.//img[@decoding="sync"]/@src').get()
            title = i.xpath('.//h2/a/text()').get(default='').strip()
            evaluation_text = i.xpath('.//span[@class="andes-visually-hidden"]/text()').get(default='').strip()
            if evaluation_text:
                match = re.search(r'Avaliação (\d+\.\d+) de 5\. \(([\d,]+) avaliações\)', evaluation_text)

                if match:
                    stars = match.group(1)
                    evaluations = match.group(2)
                else:
                    stars = '0.0'
                    evaluations = '0'
            else:
                stars = '0.0'  
                evaluations = '0'
                if match:
                    stars = match.group(1)
                    evaluations = match.group(2)
                else:
                    stars = '0.0'
                    evaluations = '0'
            #stars = i.xpath('.//span[@class="poly-reviews__rating"]/text()').get(default='0.0').strip()
            #evaluations = i.xpath('.//span[@class="poly-reviews__total"]/text()').get(default='(0)').strip()

            if promo_price and all([promo_price, title, link, stars, evaluations, image]):
                total_price = f"{promo_price},{promo_cents}" if promo_cents else promo_price
                yield {
                    'preço promocional': total_price,
                    'título': title,
                    'link': link,
                    'loja': 'mercado livre',
                    'estrelas': stars,
                    'avaliações': evaluations,
                    'imagem': image
                }
            elif all([price, title, link, stars, evaluations, image]):
                total_price = f"{price},{cents}" if cents else price
                yield {
                    'preço': total_price,
                    'título': title,
                    'link': link,
                    'loja': 'mercado livre',
                    'estrelas': stars,
                    'avaliações': evaluations,
                    'imagem': image
                }