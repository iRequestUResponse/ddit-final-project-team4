<template>
    <div id = "app">
    <h1>내놓은 집 상세보기</h1>
        <v-container class="px-auto bor">
            <v-row>
                <v-col cols="7"><h3>집 주소 : {{ offer.OFFERHOUSE_ADDR }} - {{ offer.OFFERHOUSE_ADDR2 }}</h3></v-col>
                <v-col cols="4"> 
                    <v-row>
                        <v-text-field
                                type="number"
                                v-model="price"
                                label="가격을 입력해주세요"
                                outlined
                                class="juk-mu_text-field"
                        >
                        </v-text-field>
                        <img id="estimateSubmit" src="@/assets/img/money.png" text @click="estimateSubmit"><p>견적내기</p>
                    </v-row>
                    <div>
                    {{ price | comma }}
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3">면적 : {{ offer.OFFERHOUSE_AREA }} ㎡</v-col>
                <v-col cols="2">평수 : {{ offer.OFFERHOUSE_PYEONG }}평</v-col>
                <v-spacer></v-spacer>
                <v-col cols="4">회원아이디 : [ {{ offer.USERID }} ]</v-col>
            </v-row>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="2"></v-col>
            </v-row>
            <v-row>
                <v-col></v-col>
            </v-row>
            <v-row>
                <v-col cols="4">해당층/전체층 :층/층</v-col>
            </v-row>
            <v-row justify="center">
                <v-col v-for="photo in offer.photolist" :key="photo.OFFERHOUSE_SEQ" cols="12">
                    [사진] <v-img :src="`//192.168.0.121:9000/api/file/${photo.OFFERPHOTO_PATH}`" width="512px"></v-img>
                </v-col>
                <v-col cols="12">
                    <v-content></v-content>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    props: ['offerNum'],
    beforeMount() {
        (async () => {
            let result = (await axios({
                url: `${this.serverLocation}/getOfferDetails?offerNum=${this.offerNum}`
            })).data;
            
            // let [completeionDate, availability_date] = [result.COMPLETION_DATE, result.AVAILABILITY_DATE].map(e => new Date(e));
            // result.COMPLETION_DATE = `${completeionDate.getFullYear()}.${completeionDate.getMonth() + 1}.${completeionDate.getDate()}`;
            // result.AVAILABILITY_DATE = `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;
            
        this.offer = result;
        })();
    },
    data() {
        return {
            offer: {},
            price: '',
        }
    },
    filters: {
        comma(value) {
            var num = new Number(value);
            if(value >= 100000000) return value/100000000 + '억원'
            else return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,");
        }
    },
    methods: {
        estimateSubmit(){
            axios({
                    url: `${this.serverLocation}/insertEstimate`,
                    method: 'POST',
                    data: {
                        offerNum: this.offerNum,
                        price: this.price,
                    },
            })
            .then(res => {
                console.log(res)
                if (res.data === 1) {
                    alert("견적입력 성공")
                    this.$router.push('/agentpage');
                } else {
                    alert("견적 실패")
                }

            })
        } 
    }
}

</script>

<style>
    div.bor {
        border: 1px solid black;
        margin-top: 20px;
        padding-left: 40px;
        padding-top: 30px;
    }
    #app {
        margin: 10px;
    }
    H1 {
        margin-left: 35px;
    }
    #estimateSubmit{
        width: 50px;
        height: 50px;
        cursor: pointer;
        margin-left: 20px;
    }
</style>