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
        <keep-alive>
            <component :is="selectedTab"></component>
        </keep-alive>
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
            resources: this.storedResources,
            addResource: this.addResource
        };
    },
    methods: {
        setSelectedTab(new_tab) {
            this.selectedTab = new_tab;
        },
        addResource(title, description, link){
            console.log('in addResource');
            
            this.selectedTab = 'stored-resources';

            const new_resource = {
                id: new Date().toISOString(),
                title: title,
                description: description,
                link: link
            };
            this.storedResources.unshift(new_resource);
            
        }
    }
}
</script>
