<template>
    <div>
        <ul>
            <li>
                <h2>Username: {{ userName }}</h2>
                <h3>Age: {{ age }}</h3>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
        userName: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        }}
    };
</script>
