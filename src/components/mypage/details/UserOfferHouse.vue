<template>
    <v-container>
        <div>나의 내놓은 집</div>
        <v-layout row>
            <v-flex class="bor">
                <v-row class="pa-0 ma-0 bor">
                    <v-col
                        cols="6"
                        class="bor"
                    >
                        <v-card outlined>
                            <v-img
                                src="https://ic.zigbang.com/ic/floorplan/13633/45848/304d8e6dfaaf4100a6ffcc7c4614943d.png?w=800&h=600&q=70&a=1"
                                height="200px"
                            />

                            <div>
                                <v-card-title>
                                    <div> sales.SALES_TITLE </div>
                                </v-card-title>
                                <v-card-text>
                                    <div> sales.PYEONG 평  sales.RELEVANT_FLOOR 층/ sales.WHOLE_FLOOR 층</div>
                                    <div> sales.APT_NAME   sales.DONG </div>
                                    <div> sales.SALES_CONT </div>
                                </v-card-text>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-flex>
            <v-flex class="bor">
                <div>공인중개사</div>
            </v-flex>
        </v-layout>
    </v-container>
</template>