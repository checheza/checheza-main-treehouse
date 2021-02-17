VERSION = $(shell awk -F'"' '/version/{ print $$4 }' src/manifest.js)
NAME = $(shell awk -F'"' '/identifier/{ print $$4 }' src/manifest.js)

all: build zip clean

build:
	npm install
	npm run build

zip: $(NAME)-$(VERSION).zip
$(NAME)-$(VERSION).zip: build
	cp -r build $(NAME)
	zip -r $(NAME)-$(VERSION).zip $(NAME)

clean:
	rm -rf $(NAME)

.PHONY: all zip clean
