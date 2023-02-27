from lxml import etree
from bs4 import BeautifulSoup
import sys


file = open('arq.xml', 'r')
soup = BeautifulSoup(file, 'lxml-xml', from_encoding='utf-8')
elems = soup.find_all('ARQELEM')
index = 1

for elem in elems:
    output_file = open(f'output/arq{index}.xml', 'w')
    output_file.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n")
    output_file.write(elem.prettify())
    output_file.close()
    index += 1

