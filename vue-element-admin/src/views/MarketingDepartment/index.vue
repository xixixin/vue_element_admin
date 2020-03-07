<template>
  <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入市场部"
    v-model="value2"
    :data="data2">
  </el-transfer>
</template>

<script>
  export default {
    data() {
      const generateData2 = _ => {
        const data = [];
        const cities = ['豫皖市场部', '松原市场部', '冀中市场部', '邢台市场部', '淮南市场部'];
        const pinyin = ['yuwan', 'songyuan', 'jizhong', 'xingtai', 'huainan'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    }
  };
</script>