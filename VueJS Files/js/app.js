
    Vue.component('story', {
        template: "#template-story-raw",
        props: ['story'],
        methods :{
            upvoteStory :function(story){
                story.upvotes++
                this.$http.patch('http://127.0.0.1:8000/stories/'+story.id, story)
            },
            deleteStory: function(story) {
                var index = this.$parent.stories.indexOf(story)
                this.$parent.stories.splice(index, 1)
                this.$http.delete('http://127.0.0.1:8000/stories/'+story.id )
            },
            editStory: function(story) {
                story.editing = true;
            },
            updateStory: function (story) {
                this.$http.patch('http://127.0.0.1:8000/stories/'+story.id , story)
                story.editing = false;
            },
            storeStory: function (story) {
                this.$http.post('http://127.0.0.1:8000/stories/', story).then(function(response){
                    console.log(response.data.id)
                    // Vue.set(story,'stories',response.data.results.id)
                    story.editing = false;
                })

            }
        },

    });
    var vm = new Vue({
        el: '#app',
        data: {
            stories: [],
            pagination : []
        },
        methods:{
            createStory: function () {
                var newStory = {

                    "plot":null,
                    "upvotes":0,
                    "editing":true
                };
                this.stories.push(newStory);

            },
            fetchstories : function (page_URL) {
                var vm = this;
                page_URL = page_URL || 'http://127.0.0.1:8000/stories/'
                this.$http({url:page_URL,
                    method: 'GET'
                }).then(function(response){
                    var storiesready= response.data.results.map(function(story){
                        story.editing = false
                        return story
                    })
                    vm.paginations(response.data)
                    Vue.set(vm,'stories',response.data.results)
                })
            },
            paginations: function(data){
                var pagination = {
                    count :data.count,
                    next: data.next ,
                    previous: data.previous,
                }

                Vue.set(vm,'pagination',pagination)
            }

        },
        mounted: function () {
            this.fetchstories()
        }

    })
