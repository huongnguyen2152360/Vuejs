<template>
<nav class="menu">
    <ul>
        <li><router-link to="/" exact class="mr-3">All Blogs</router-link></li>
        <li><router-link to="/add" exact class="ml-3">Add a New Blog</router-link></li>

    </ul>
</nav>

</template>

<script>

</script>

<style>
.menu {
    margin-bottom: 3rem;
    background-color: #212b2f;
    text-align: center;
}
.menu li {
    display: inline-block;
    padding: 1rem 0;
    
}
.menu a {
    color: #ffffff;
    font-size: 1.4em;
    padding: 0.5rem;
}
.menu a:hover {
    text-decoration: none;
}
.router-link-active {
    background-color: #5f813f;
    border-radius: 5px;
}
</style>