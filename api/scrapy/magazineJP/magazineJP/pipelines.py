# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import hashlib
import scrapy

class MagazinejpPipeline:
    def __init__(self):
        self.seen_items = set()

    def process_item(self, item, spider):
        item_hash = hashlib.sha256(
            (item['título'] + item['preço'] + item['link']).encode('utf-8')
        ).hexdigest()

        if item_hash in self.seen_items:
            raise scrapy.exceptions.DropItem(f"Item duplicado encontrado: {item}")
        else:
            self.seen_items.add(item_hash)
            return item