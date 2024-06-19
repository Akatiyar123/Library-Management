const admin= Vue.component('admin', {
    template:
    `
    <div>

    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addbook">
Add Book</button>

<!-- Modal -->
<div class="modal fade" id="addbook" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...



        <div class="form-group">
                        <label for="book_name" class="form-label">Book Name </label>
                        <input type="text" v-model="book_name" class="form-control" id="book_name" >
                    </div>
                    <div class="form-group">
                        <label for="book_auth" class='form-label'>Author </label>
                        <input type="text" v-model="book_auth" id="book_auth"  class='form-control'>
                    </div>
                    <div class="form-group">
                        <label for="book_contain" class='form-label'>Contains </label>
                        <input type="text" v-model="book_contains" id="book_contains"  class='form-control'>
                    </div>
                  















      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click='add_book' data-dismiss="modal">Add Book</button>
      </div>
    </div>
  </div>
</div>





<!-- Button trigger modal  for adding Section-->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addsection">
Add Section</button>

<!-- Modal -->
<div class="modal fade" id="addsection" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


      <div class="form-group">
                        <label for="section_name" class="form-label">Section Name </label>
                        <input type="text" v-model="section_name" class="form-control" id="sec_name" >
                    </div>
                    <div class="form-group">
                        <label for="section_desc" class='form-label'>Description </label>
                        <input type="text" v-model="section_desc" id="secction_desc"  class='form-control'>
                    </div>
                  


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click='add_section' data-dismiss="modal">Add Section</button>
      </div>
    </div>
  </div>
</div>



<button @click="gotodash" type="button" class="btn btn-info">Dashboard</button>











    <h1>Book Sections</h1>
    
    
    <div v-for="section in sections" :key="section.id" class="card mb-3">
      <div class="card-header">
        <h2>{{ section.section_name }}</h2>










        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target=" '#sec' + section.id ">
                Edit
            </button>
            
            <div class="modal fade" :id=" 'sec' + section.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit Section</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center">
                            <form>
                                <div class="form-group">
                                    <label for="Section Name" class="form-label">Section Name: </label>
                                    <input type="text" v-model="new_sectionname" class="form-control" id="new_sectionname" >
                                </div>
                                <div class="form-group">
                                    <label for="Section desc" class="form-label">Section Desc </label>
                                    <input type="text" v-model="new_sectiondisc" class="form-control" id="new_sectiondisc">
                                </div>
                                
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button"  ref="closeButton" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="editsection(section)" data-bs-dismiss="modal" >Edit</button>
                    </div>
                    </div>
                </div>
            </div>

























        <button @click="remove_section(section)" class="btn btn-secondary">Remove Section</button>

      </div>
      <div class="card-body">
        <p class="card-text">{{ section.section_description }}</p>
        <div class="row">
          <div v-for="(book, index) in section.books.slice(0, showAllBooks ? section.books.length : 3)" :key="index" class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ book.book_name }}</h5>
                <p class="card-text"><strong>Author(s):</strong> {{ book.book_authors }}</p>
                <p class="card-text"><strong>Content:</strong> {{ book.book_content }}</p>
                
                <button @click="viewBook(book.id)" class="btn btn-primary">View</button>

























                <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target=" '#' + book.id ">
                Edit
            </button>
            
            <div class="modal fade" :id="book.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit Book</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center">
                            <form>
                                <div class="form-group">
                                    <label for="Book Name" class="form-label">Book Name: </label>
                                    <input type="text" v-model="new_bookname" class="form-control" id="new_bookname">
                                </div>
                                <div class="form-group">
                                    <label for="Book Author" class="form-label">Book Author: </label>
                                    <input type="text" v-model="new_bookauthor" class="form-control" id="new_bookauthor">
                                </div>
                                <div class="form-group">
                                    <label for="Book content" class="form-label">Book Content: </label>
                                    <input type="text" v-model="new_bookcontent" class="form-control" id="new_bookcontent">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button"  ref="closeButton" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="editbook(book)" data-bs-dismiss="modal" >Edit</button>
                    </div>
                    </div>
                </div>
            </div>
































                <button @click="remove_book(book)" class="btn btn-secondary">Remove Book</button>

              </div>
            </div>
          </div>
        </div>
        <button v-if="!showAllBooks && section.books.length > 3" @click="showAllBooks = true" class="btn btn-info mt-3">Show All</button>
      </div>
    </div>













<br/>

    <button  @click="fetch_uncat" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Uncategorized Books</button>

<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

    <h1 class="text-center"> Uncat Book </h1>

    
    <div v-for="book in uncat_books" :key="book.id" class="card mb-3">
      <div class="card-header">
        <h3>{{ book.book_name }}</h3>
        <h5>{{ book.book_authors }}</h5>


        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Add to Section  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <div v-for="section in sections" :key="section.id" class="card mb-3">

  <button @click="add_to_section(book.id , section.id)" class="btn btn-secondary" data-dismiss="modal">{{section.section_name}}</button>

  </div>
</div>

    </div>
  </div>
</div>
        








    </div>
  </div>
</div>
<br/>

  </div>

  `,
  data() {
    return {
      sections: [],
      showAllBooks: false,
      section_name:null,
      section_desc : null,
      book_name:null,
      book_auth:null,
      book_contains:null,
      new_bookname:null,
      new_bookauthor:null,
      new_bookcontent:null,
      new_sectiondisc:null,
      new_sectionname:null,
      uncat_books : []
      // new_sectiondisc:section.section_name,
      // new_sectionname:section.section_description
    };
  },
  created() {
    // Fetch sections from API when the component is created
    this.fetchSections();
  },
  methods: {

    gotodash(){
      this.$router.push({ path: '/lib_dash' })

    },


    async fetchSections() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/sections'); // Replace 'api/sections' with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch sections');
        }
        const data = await response.json();
        console.log(data)
        this.sections = data; // Assuming the response contains an array of sections
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    },

    add_to_section(book_id , section_id){
      console.log(book_id)
      console.log(section_id)

      fetch("http://127.0.0.1:5000/api/book-section",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                  
                },
                body:JSON.stringify({
                    
                    'section_id':section_id,
                    'book_id' : book_id
                    
                })
            })
            .then(response => response.json())
            .then(data => {
                this.$store.dispatch('flash_message', data.message)
                this.fetchSections();

            })
            .catch(e => console.log(e))

    },

    add_section(){





      if (this.section_name && this.section_desc){
        fetch("http://127.0.0.1:5000/api/section",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                  
                },
                body:JSON.stringify({
                    
                    'section_name':this.section_name,
                    'section_description' : this.section_desc
                    
                })
            })
            .then(response => response.json())
            .then(data => {
                this.$store.dispatch('flash_message', data.message)
                this.fetchSections();

            })
            .catch(e => console.log(e))
        }















      console.log("add_section")
    },
    add_book(){





      if (this.book_name && this.book_auth && this.book_contains){
        fetch("http://127.0.0.1:5000/api/book",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                  
                },
                body:JSON.stringify({
                    
                    'book_name':this.book_name,
                    'book_content' : this.book_contains,
                    'book_authors': this.book_auth
                    
                })
            })
            .then(response => response.json())
            .then(data => {
                this.$store.dispatch('flash_message', data.message)
                this.fetchSections();

            })
            .catch(e => console.log(e))
        }














      console.log("add_book")
    },






    editsection(section) {
      if (this.new_sectionname && this.new_sectiondisc){
          fetch(`http://127.0.0.1:5000/api/section/${section.id}`,{
              method:'PUT',
              headers:{
                  'Content-Type':'application/json',
                  'Authentication-Token':  localStorage.getItem('auth-token'),
              },
              body:JSON.stringify({
                  'section_name':this.new_sectionname,
                  'section_description' : this.new_sectiondisc,

              })
          })
          .then(response => response.ok?response.json(): new Error('Error editing Section'))
          .then(data => {
              this.$store.dispatch('flash_message', data.message)
              console.log(this.$refs)
              this.fetchSections();

          })
          .catch(error => {
              console.error('Error editing category:', error);
          });
      }
      else{
          this.$store.dispatch('flash_message', 'Please enter a category name')
      }
    }
,

async fetch_uncat() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/uncategorised-books'); // Replace 'api/sections' with your API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }
    const data = await response.json();
    console.log(data)
    this.uncat_books = data; // Assuming the response contains an array of sections
  } catch (error) {
    console.error('Error fetching sections:', error);
  }
},































    async remove_section(section) {
      const userConfirmed  = window.confirm(`Are you sure you want to delete ${section.section_name}?`);
        if (userConfirmed){
        try{
            let response = await fetch(`http://127.0.0.1:5000/api/section/${section.id}`,{
                method:'DELETE',
                headers:{
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                },
                
            })
            if (!response.ok){
                let data = await response.json()
                this.$store.dispatch('flash_message', data.message)
            }
            else{
                let data = await response.json()
                this.$store.dispatch('flash_message', data.message)
                this.fetchSections();

            }

        }catch(e){
            console.log(e)
        }
      }
      },





    async remove_book(book) {
      const userConfirmed  = window.confirm(`Are you sure you want to delete ${book.book_name}?`);
        if (userConfirmed){
        try{
            let response = await fetch(`http://127.0.0.1:5000/api/book/${book.id}`,{
                method:'DELETE',
                headers:{
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                },
                
            })
            if (!response.ok){
                let data = await response.json()
                this.$store.dispatch('flash_message', data.message)
            }
            else{
                let data = await response.json()
                this.$store.dispatch('flash_message', data.message)
                this.fetchSections();

            }

        }catch(e){
            console.log(e)
        }
      }
      },




      editbook(book) {
        if (this.new_bookname && this.new_bookauthor && this.new_bookcontent){
            fetch(`http://127.0.0.1:5000/api/book/${book.id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authentication-Token':  localStorage.getItem('auth-token'),
                },
                body:JSON.stringify({
                    'book_name':this.new_bookname,
                    'book_authors' : this.new_bookauthor,
                    'book_content' : this.new_bookcontent

                })
            })
            .then(response => response.ok?response.json(): new Error('Error editing book'))
            .then(data => {
                this.$store.dispatch('flash_message', data.message)
                console.log(this.$refs)
                this.fetchSections();

            })
            .catch(error => {
                console.error('Error editing category:', error);
            });
        }
        else{
            this.$store.dispatch('flash_message', 'Please enter a category name')
        }
      },


















      viewBook(bookId) {
        // Implement view book functionality
        this.$router.push({ path: `/dashboard/${bookId}` })

        console.log('View book:', bookId);
      },
   
  }

})
export default admin;