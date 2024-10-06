from scrapy_selenium import SeleniumRequest
import scrapy

class MySpider(scrapy.Spider):
    name = 'RA'
    start_urls = ['https://www.reclameaqui.com.br/empresa/mercado-livre/lista-reclamacoes/']

    def start_requests(self):
        for url in self.start_urls:
            yield SeleniumRequest(url=url, callback=self.parse, wait_time=5)  # Wait for 5 seconds

    def parse(self, response):
        self.logger.info("Spider started!")

        for item in response.css('div.sc-1pe7b5t-0'):
            yield {
                'title': item.css('h4[class="sc-1pe7b5t-1 bVKmkO"]::text').get(default='').strip(),
                'description': item.css('p.sc-1pe7b5t-2 eHoNfA::text').get(default='').strip(),
                'status': item.css('span.sc-1pe7b5t-4::text').get(default='').strip(),
                'time': item.css('span.sc-1pe7b5t-5::text').get(default='').strip(),
            }
