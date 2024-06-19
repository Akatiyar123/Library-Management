const Dashboard = Vue.component('dashboard', {
    props : ['bookId'],
  template:
      `
  <div>
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">{{ book.book_name }}</h5>
    <p class="card-text"><strong>Author(s):</strong> {{ book.book_authors }}</p>
    <p class="card-text"><strong>Content:</strong> {{ book.book_content }}</p>

    <button @click="showfeedback" type="button" class="btn btn-info">Show Feedback</button>

    <div v-if="feedbacknum % 2 === 0">

    <h1> FeedBack</h1>
    <div v-for="(feedback, index) in book.feedback" class="col-md-4 mb-3">
    <p class="card-text"><strong>UserName:</strong> {{ feedback.user.username }}</p>
    <p class="card-text"><strong>Rating:</strong> {{ feedback.ratings }}</p>
    <p class="card-text"><strong>Feedback:</strong> {{ feedback.feedback }}</p>
        
        
        </div>

    

    </div>
        

</div>
    

  </div>
  </div>
  `,
  data: function(){
      return {
          book : [],
          feedbacknum : 1
      }
  },
  created() {
    // Fetch sections from API when the component is created
    this.viewbook();
  },
  methods:{
    async viewbook() {

        try{
            let response = await fetch(`http://127.0.0.1:5000/api/book/${this.bookId}`,{
                
            })
            if (!response.ok){
                let data = await response.json()
                this.$store.dispatch('flash_message', data.message)
            }
            else{
                let data = await response.json()
                this.book = data
                this.$store.dispatch('flash_message', data.message)

            }

        }catch(e){
            console.log(e)
        }
      },
      
      showfeedback(){
        this.feedbacknum = this.feedbacknum+1
  
      },
  }
})
export default Dashboard;
