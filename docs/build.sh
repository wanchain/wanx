#!/bin/bash

cd `dirname "$0"`

jsdoc2md --separators \
	../src/eth/* \
	| sed 's/etH/ETH/' \
	| sed 's/[ \t]*$//' \
    > ./api-reference-eth.md

jsdoc2md --separators \
    ../src/btc/base.js ../src/btc/inbound.js ../src/btc/outbound.js \
	| sed 's/btC/BTC/' \
	| sed 's/[ \t]*$//' \
    > ./api-reference-btc.md

jsdoc2md --separators \
	../src/erc20/* \
	| sed 's/erC/ERC/' \
	| sed 's/[ \t]*$//' \
    > ./api-reference-erc20.md

cd -
