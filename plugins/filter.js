import Vue from 'vue'

Vue.filter('filter',function(val){
    return val + ' filtered'
})