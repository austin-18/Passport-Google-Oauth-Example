<template>
    <div>
        {{msg}}
        <button @click="onLogout">Logout</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Logout',
  data(){
    return{
      msg:'not logged out'
    }
  },
  methods: {
    onLogout(){
      axios.get('http://localhost:5000/api/v1/auth/logout',{withCredentials:true}).then((res)=>{self.$set(this,'msg',res.data.data)}).catch(err=>(this.msg=err.data.data))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
