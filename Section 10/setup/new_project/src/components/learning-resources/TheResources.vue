<template>
    <base-card>
        <!--
            attribute fallthrough - the @click event falls through to the base-button <button> element
        -->
        <base-button
        @click="setSelectedTab('stored-resources')"
        :mode="selectedTab === 'stored-resources' ? null : 'flat'">
            Stored Resources
        </base-button>
        <base-button
        @click="setSelectedTab('add-resource')"
        :mode="selectedTab === 'add-resource' ? null : 'flat'">
            Add Resource
        </base-button>
        <component :is="selectedTab"></component>
    </base-card>
</template>

<script>

import StoredResources from './StoredResources.vue';
import AddResource from './AddResource.vue';

export default {
    components: {
        StoredResources, AddResource
    },
    data() {
        return {
            selectedTab: 'stored-resources',
            storedResources: [
                {
                    id: 'official-guide',
                    title: 'Official Guide',
                    description: 'The official vue.js documentation',
                    link: 'https://vuejs.org'
                },
                {
                    id: 'google',
                    title: 'Google',
                    description: 'Learn to google',
                    link: 'https://google.org'
                },
            ],
        };
    },
    provide() {
        return {
            resources: this.storedResources
        };
    },
    methods: {
        setSelectedTab(new_tab) {
            this.selectedTab = new_tab;
        }
    }
}
</script>
