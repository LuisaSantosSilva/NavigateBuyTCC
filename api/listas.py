import json
import os

def juntar_arquivos(caminho_arquivo, saida_arquivo):
    try:
        data_list = []
        for file_path in caminho_arquivo:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                data_list.append(data)

        if all(isinstance(item, dict) for item in data_list):
            juntar_arquivos = {}
            for data in data_list:
                juntar_arquivos.update(data)
        elif all(isinstance(item, list) for item in data_list):
            juntar_arquivos = []
            for data in data_list:
                juntar_arquivos.extend(data)
        else:
            raise ValueError("Os arquivos JSON devem ser ambos listas ou ambos dicionários.")
        
        with open(saida_arquivo, 'w', encoding='utf-8') as f_out:
            json.dump(juntar_arquivos, f_out, indent=4, ensure_ascii=False)

        print(f"Os arquivos foram unidos com sucesso em {saida_arquivo}.")
    
    except FileNotFoundError as e:
        print(f"Erro: O arquivo não foi encontrado - {e}")
    except json.JSONDecodeError as e:
        print(f"Erro ao decodificar JSON - {e}")
    except Exception as e:
        print(f"Ocorreu um erro - {e}")

project_root = os.path.dirname(os.path.abspath(__file__))
listas_json_dir = os.path.join(project_root, 'listasJson')

if not os.path.exists(listas_json_dir):
    os.makedirs(listas_json_dir)

# Categoria Acessorios
acessorios_paths = [
    os.path.join(project_root, 'scrapy', 'americanas',  'data',  'acessorio.json'),
    os.path.join(project_root, 'scrapy', 'centauro',  'data',  'acessorio.json'),
    os.path.join(project_root, 'scrapy', 'marisa',  'data',  'acessorio.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Acessorios.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Acessorio.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Acessorio.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Acessorio.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Acessorio.json')
]

juntar_arquivos(acessorios_paths, os.path.join(listas_json_dir, 'Acessorios.json'))

# Categoria Bebes
bebes_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'bebes.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Bebes.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Bebes.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Bebes.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Bebes.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Bebes.json'),
    os.path.join(project_root, 'scrapy', 'oboticario', 'data', 'Bebes.json')
]

juntar_arquivos(bebes_paths, os.path.join(listas_json_dir, 'Bebes.json'))

# Categoria Beleza
beleza_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'beleza.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Beleza.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Beleza.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Beleza.json'),
    os.path.join(project_root, 'scrapy', 'oboticario', 'data', 'Beleza.json'),
    os.path.join(project_root, 'scrapy', 'ultrafarma', 'data', 'beleza.json')
]

juntar_arquivos(beleza_paths, os.path.join(listas_json_dir, 'Beleza.json'))

# Categoria Decoracao
decoracao_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'decoracao.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Decoracao.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Decoracao.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Decoracao.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Decoracao.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Decoracao.json'),
    os.path.join(project_root, 'scrapy', 'marisa', 'data', 'decoracao.json')
]    

juntar_arquivos(decoracao_paths, os.path.join(listas_json_dir, 'Decoracao.json'))

# Categoria Eletrodomestico
eletrodomestico_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'eletrodomestico.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Eletrodomestico.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Eletrodomestico.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Eletrodomestico.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Eletrodomestico.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Eletrodomestico.json')
]

juntar_arquivos(eletrodomestico_paths, os.path.join(listas_json_dir, 'Eletrodomesticos.json'))

# Categoria Esporte
esporte_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'esporte.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Esporte.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Esporte.json'),
    os.path.join(project_root, 'scrapy', 'centauro', 'data', 'esporte.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Esporte.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Esporte.json')
]

juntar_arquivos(esporte_paths, os.path.join(listas_json_dir, 'Esporte.json'))

# Categoria Informatica
informatica_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'informatica.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Informatica.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Informatica.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Informatica.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Informatica.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Informatica.json')
]    

juntar_arquivos(informatica_paths, os.path.join(listas_json_dir, 'Informatica.json'))

# Categoria Lazer
lazer_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'lazer.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Lazer.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Lazer.json'),
    os.path.join(project_root, 'scrapy', 'centauro', 'data', 'lazer.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Lazer.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Lazer.json')
]

juntar_arquivos(lazer_paths, os.path.join(listas_json_dir, 'Lazer.json'))

# Categoria Mercado e Farmacia
mercadoFarmacia_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'MF.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Mercado_Farmacia.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Mercado_Farmacia.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Mercado_Farmacia.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Mercado_Farmacia.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Mercado_Farmacia.json'),
    os.path.join(project_root, 'scrapy', 'ultrafarma', 'data', 'medicamentos.json')    
]

juntar_arquivos(mercadoFarmacia_paths, os.path.join(listas_json_dir, 'MercadoFarmacia.json'))

# Categoria Papelaria
papelaria_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'papelaria.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Papelaria.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Papelaria.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Papelaria.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Papelaria.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Papelaria.json')
]

juntar_arquivos(papelaria_paths, os.path.join(listas_json_dir, 'Papelaria.json'))

# Categoria Pets
pets_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'pet.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Pets.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Pets.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Pets.json'),
    os.path.join(project_root, 'scrapy', 'oboticario', 'data', 'Pets.json')
]    

juntar_arquivos(pets_paths, os.path.join(listas_json_dir, 'Pets.json'))

# Categoria Roupas
roupas_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'roupa.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Roupas.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Roupas.json'),
    os.path.join(project_root, 'scrapy', 'centauro', 'data', 'roupa.json'),
    os.path.join(project_root, 'scrapy', 'kalunga', 'data', 'Roupas.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Roupas.json'),
    os.path.join(project_root, 'scrapy', 'marisa', 'data', 'roupa.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Roupa.json')
]

juntar_arquivos(roupas_paths, os.path.join(listas_json_dir, 'Roupas.json'))

# Categoria Sapato
sapato_paths = [
    os.path.join(project_root, 'scrapy', 'americanas', 'data', 'sapato.json'),
    os.path.join(project_root, 'scrapy', 'casasbahia', 'data', 'Sapato.json'),
    os.path.join(project_root, 'scrapy', 'CEA', 'data', 'Sapato.json'),
    os.path.join(project_root, 'scrapy', 'centauro', 'data', 'sapato.json'),
    os.path.join(project_root, 'scrapy', 'magazineJP', 'data', 'Sapato.json'),
    os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Sapato.json')
]

juntar_arquivos(sapato_paths, os.path.join(listas_json_dir, 'Sapato.json'))