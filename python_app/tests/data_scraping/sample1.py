import requests
from bs4 import BeautifulSoup
from bs4.element import Comment
from urllib.parse import urljoin
from urllib.parse import urlparse
# Set the base URL
base_url = "https://sun.ac.jp/"
# Set the maximum depth for crawling
max_depth = 2
# List to store the extracted URLs
count = 0
extracted_urls = []
def tag_visible(element):
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True
def extract_text(html):
    soup = BeautifulSoup(html, 'html.parser')
    texts = soup.findAll(text=True)
    visible_texts = filter(tag_visible, texts)
    return u" ".join(t.strip() for t in visible_texts)
def crawl_url(url, depth):
    global count
    if depth > max_depth:
        return
    try:
        response = requests.get(url)
        html = response.content
        text = extract_text(html)
        count+=1
        print(f"Total links found: {count}")
        print(f"URL: {url}")
        print(f"Text: {text}\n")
        extracted_urls.append(url)
        soup = BeautifulSoup(html, 'html.parser')
        links = soup.find_all('a')
        for link in links:
            href = link.get('href')
            if href is None or href == "":
                continue
            if href.startswith('/') or base_url in href:
                absolute_url = urljoin(base_url, href)
                if absolute_url not in extracted_urls:
                    crawl_url(absolute_url, depth + 1)
    except requests.exceptions.RequestException as e:
        print(f"Error occurred while crawling URL: {url}")
        print(f"Error details: {e}\n")
def crawl_single_url(url):
    try:
        response = requests.get(url)
        html = response.content
        text = extract_text(html)
        print(f"Total links found: {count}")
        print(f"URL: {url}")
        print(f"Text: {text}\n")
        file_contents = "URL: \n" + url + "\n" + "Text: \n" + text + "\n"
    except requests.exceptions.RequestException as e:
            print(f"Error occurred while crawling URL: {url}")
            print(f"Error details: {e}\n")
    
    parsed_url = urlparse(url)
    file_name = parsed_url.path.strip("/").replace("/", "_") + ".txt"

    with open(f"{file_path}/{file_name}", "a") as f:
        f.write(file_contents)

    
# Start crawling from the base URL
file_path = "./data/faculty"
# crawl_url(base_url, 0)
# crawl_single_url("https://sun.ac.jp/department/systems/systems/")
url_list = [
    "https://sun.ac.jp/department/systems/systems/",
    "https://sun.ac.jp/department/systems/systems/",
]

for url in url_list:
    crawl_single_url(url)
