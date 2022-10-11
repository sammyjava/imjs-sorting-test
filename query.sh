#!/bin/sh

XML=queryChromosomes.xml
FORMAT=$1

QUERY=`cat $XML`

curl --data-urlencode query="$QUERY" -d format=$FORMAT https://mines.legumeinfo.org/legumemine/service/query/results

echo ""
