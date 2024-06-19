const LibrarianDashboard = Vue.component('LibrarianDashboard', {
    template:
        `
    <div class="container-fluid mt-5">

        <div class="row justify-content-center">
            <div class="justify-content-center col-8 shadow-lg rounded p-4">        <h2 class="text-center">Librarian Dashboard</h2>
            </div>
        </div>



        <div class="card-body">
        <h3 class="card-text">Pending Req</h3>
        <div class="row">
        
          <div v-for="(book, index) in pending_books.slice(0, showAllBooks ? pending_books.length : 3)" :key="index" class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ book.books.book_name }}</h5>
                <p class="card-text"><strong>Author(s):</strong> {{ book.books.book_authors }}</p>
                <p class="card-text"><strong>Content:</strong> {{ book.books.book_content }}</p>
                <p class="card-text"><strong>Requested By:</strong> {{ book.user.username }}</p>

                <button @click="accept_book(book)" class="btn btn-secondary">Accept</button>
                <button @click="revoke_book(book)" class="btn btn-secondary">Reject</button>


            </div>            </div>
            </div>
            </div>
            </div>



            <div class="card-body">
        <h3 class="card-text">Approved Req</h3>
        <div class="row">
          <div v-for="(book, index) in approved_books.slice(0, showAllBooks ? approved_books.length : 3)" :key="index" class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ book.books.book_name }}</h5>
                <p class="card-text"><strong>Author(s):</strong> {{ book.books.book_authors }}</p>
                <p class="card-text"><strong>Content:</strong> {{ book.books.book_content }}</p>
                <p class="card-text"><strong>Requested By:</strong> {{ book.user.username }}</p>

                
                <button @click="revoke_book(book)" class="btn btn-secondary">Reject</button>


            </div>            </div>
            </div>
            </div>
            </div>



    </div>
    `,
    

    data() {
        return {
          pending_books: [],
          approved_books : [],
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
        this.fetch_pending_books();
        this.fetch_approved_books()
      },
      methods: {
    
    
    
        async fetch_pending_books() {
            console.log("abcd")
            try{
                let response = await fetch(`http://127.0.0.1:5000/api/show-pending-issue-request`,{
                    method:'GET',
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
                    this.pending_books = data
                    this.$store.dispatch('flash_message', data.message)
    
                }
    
            }catch(e){
                console.log(e)
            }
          }
        ,






        async fetch_approved_books() {
            console.log("abcd")
            try{
                let response = await fetch(`http://127.0.0.1:5000/api/show-issued-books`,{
                    method:'GET',
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
                    this.approved_books = data
                    this.$store.dispatch('flash_message', data.message)
    
                }
    
            }catch(e){
                console.log(e)
            }
          },
    
          accept_book(book){
         
    
          fetch(`http://127.0.0.1:5000/api/approve-issue/${book.id}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Authentication-Token':  localStorage.getItem('auth-token'),
                      
                    },
                    
                })
                .then(response => response.json())
                .then(data => {
                    this.$store.dispatch('flash_message', data.message)
                    this.fetch_pending_books();
                    this.fetch_approved_books()
    
                })
                .catch(e => console.log(e))
    
        },
        revoke_book(book){
            
      
            fetch(`http://127.0.0.1:5000/api/approve-issue/${book.id}`,{
                      method:'DELETE',
                      headers:{
                          'Content-Type':'application/json',
                          'Authentication-Token':  localStorage.getItem('auth-token'),
                        
                      },
                      
                  })
                  .then(response => response.json())
                  .then(data => {
                      this.$store.dispatch('flash_message', data.message)
                      this.fetch_pending_books();
                      this.fetch_approved_books()
      
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      
        }
      }
    
    )
    export default LibrarianDashboard;

