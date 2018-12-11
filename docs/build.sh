#!/bin/bash

cd `dirname "$0"`

jsdoc2md --separators \
	../src/eth/* \
    ../src/btc/base.js ../src/btc/inbound.js ../src/btc/outbound.js \
	../src/erc20/* \
	| sed 's/btC/BTC/' \
	| sed 's/erC/ERC/' \
	| sed 's/etH/ETH/' \
	| sed 's/[ \t]*$//' \
    > ./api-reference.md

cd -
