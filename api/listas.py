import json
import os

project_root = os.path.dirname(os.path.abspath(__file__))

Acessorios1_path = os.path.join(project_root, 'scrapy', 'americanas',  'data',  'acessorio.json')
Acessorios2_path = os.path.join(project_root, 'scrapy', 'centauro',  'data',  'acessorio.json')
Acessorios3_path = os.path.join(project_root, 'scrapy', 'marisa',  'data',  'acessorio.json')
Acessorios4_path = os.path.join(project_root, 'scrapy', 'mercadolivre', 'data', 'Acessorios.json')

try:
    with open(Acessorios1_path, 'r', encoding='utf-8') as f1, \
        open(Acessorios2_path, 'r', encoding='utf-8') as f2, \
        open(Acessorios3_path, 'r', encoding='utf-8') as f3, \
        open(Acessorios4_path, 'r', encoding='utf-8') as f4:
        acessorios1 = json.load(f1)
        acessorios2 = json.load(f2)
        acessorios3 = json.load(f3)
        acessorios4 = json.load(f4)
    
    if isinstance(acessorios1, dict) and \
        isinstance(acessorios2, dict) and \
        isinstance(acessorios3, dict) and \
        isinstance(acessorios4, dict):
        data = {**acessorios1, **acessorios2, **acessorios3, **acessorios4}
    elif isinstance(acessorios1, list) and \
        isinstance(acessorios2, list) and \
        isinstance(acessorios3, list) and \
        isinstance(acessorios4, list):
        data = acessorios1 + acessorios2 + acessorios3 + acessorios4
    else:
        raise ValueError("Os arquivos JSON devem ser ambos listas ou ambos dicionários.")

    final_data = os.path.join(project_root, 'Acessorios.json')
    with open(final_data, 'w', encoding='utf-8') as f_out:
        json.dump(data, f_out, indent=4, ensure_ascii=False)

    print("Os arquivos foram unidos com sucesso.")

except FileNotFoundError as e:
    print(f"Erro: O arquivo não foi encontrado - {e}")
except json.JSONDecodeError as e:
    print(f"Erro ao decodificar JSON - {e}")
except Exception as e:
    print(f"Ocorreu um erro - {e}")