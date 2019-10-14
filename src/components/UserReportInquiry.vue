<template>
    <v-container>
        <v-simple-table class="juk-uri_table">
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">제목</th>
                    <th class="text-center">날짜</th>
                    <th class="text-center">상태</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in reports" :key="item.title">
                    <td>{{ item.title }}</td>
                    <td class="text-center">{{ item.report_date }}</td>
                    <td class="text-center">{{ item.processing_status }}</td>
                </tr>
            </tbody>
        </template>
        </v-simple-table>
    </v-container>
</template>

<style>
    .juk-uri_table {
  border-top: 2px solid #737373;
  border-bottom: 2px solid #d6d6d6;
}
</style>

<script>
export default {
    data() {
        return {
            reports: [
                {
                value: false,
                title: '[신고사유]글제목',
                report_date: '19.10.14',
                processing_status: '처리중',
                },
                {
                value: false,
                title: '[신고사유]글제목',
                report_date: '19.10.14',
                processing_status: '처리완료',
                },
                {
                value: false,
                title: '[신고사유]글제목',
                report_date: '19.10.14',
                processing_status: '처리완료',
                },
            ]
        }
    }
}
</script>