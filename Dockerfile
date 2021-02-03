FROM node

WORKDIR /build
RUN apt update && \
    apt install -y zip
CMD ["make", "zip"]
