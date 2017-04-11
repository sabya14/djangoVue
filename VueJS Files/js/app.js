
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.1/vue.js"></script>
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/vue.resource/1.3.1/vue-resource.min.js"></script>

<script type="text/javascript">
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
                this.$http.post('http://127.0.0.1:8000/stories/', story).then(function(){
                    Vue.set(story,'id',response.data.id)
                    story.editing = false;
                })

            }
        },

    });
    var vm = new Vue({
        el: '#app',
        data: {
            stories: []
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
            fetchstories : function () {
                this.$http({url:'http://127.0.0.1:8000/stories/',
                    method: 'GET'
                }).then(function(response){
                    var storiesready= response.data.map(function(story){
                        story.editing = false
                        return story
                    })
                    Vue.set(vm,'stories',response.data)
                })
            }

        },
        mounted: function () {
            this.fetchstories()
        }

    })
</script>