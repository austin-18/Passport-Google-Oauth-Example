<template>
    <div>
        <h1>Login</h1>
        <a href="http://localhost:5000/api/v1/auth/google"><button>Login With Google</button></a>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Login',
  methods: {
    onClick(){
      // axios.get('http://localhost:5000/api/v1/auth/google',{withCredentials:true})
      // .then(res => res.data)
      // .catch(err => err.data)
      this.$router.route('http://localhost:5000/api/v1/auth/google')
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
