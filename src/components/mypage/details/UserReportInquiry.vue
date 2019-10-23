<template>
    <v-container>
        <v-row v-if="this.reports.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">내용이 없습니다.</div>
            </v-col>
        </v-row>
        <v-simple-table v-else class="juk-uri_table">
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">제목</th>
                    <th class="text-center">날짜</th>
                    <th class="text-center">상태</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="report in reports" :key="report.REPORT_SEQ">
                    <td>[{{ report.REPORT_REASON }}] {{ report.REPORT_CONT }}</td>
                    <td class="text-center">{{ report.REPORT_DATE.substring(0,10) }}</td>
                    <td v-if="report.PROCESSING_STATUS === 'N'" class="text-center">처리중</td>
                    <td v-else class="text-center">처리완료</td>
                </tr>
            </tbody>
        </template>
        </v-simple-table>
    </v-container>
</template>

<script>
export default {
    beforeMount() {
        (async () => {
            this.reports = (await axios({
                url: `${this.serverLocation}/mpReportList`
            })).data;
        })();
    },
    data() {
        return {
            reports: [],
        }
    },
    methods: {

    }
}
</script>

<style>
    .juk-uri_table {
        border-top: 2px solid #737373;
        border-bottom: 2px solid #d6d6d6;
    }

    .juk-empty_content {
        height: 384px;
    }
</style>