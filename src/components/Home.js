import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function Home() {

   const [data, setData] = useState([])
   const [columns] = useState([
      { title: "JIRAID", field: "key" , cellStyle:{color: "red"} },
      { title: "Summary", field: "summary",cellStyle:{color: "blue"} },
      { title: "Assignee", field: "assignee",cellStyle:{color: "blue"} },
      { title: "Comment", field: "comment", cellStyle:{color: "blue"} },
   ])

   let outhcode = localStorage.getItem('code')
   console.log(outhcode);

   useEffect(() => {

      // define data to be posted 

      let data =
      {
         "grant_type": "authorization_code",
         "client_id": "nI1QfURNOBx9WRNS0NtPIqqy4YmP473K",
         "client_secret": "QdIopXjQ_4Aelendjwts7fQwfxrftqatF0rYn5C6yr7a0-b0pQB0gC8_UDRXKswf",
         "code": outhcode,
         "redirect_uri": "http://localhost:3000/login/callback"
      }

      //get access token 
      let token, cloudid
      axios.post('https://auth.atlassian.com/oauth/token', data)
         .then(res => {

            token = res.data.access_token
            
            Cloudid(res.data.access_token);

         })


      // get cloudid pass acccess token as authorization bearer tokens

      function Cloudid(token) {
         console.log(token);


         axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
            headers: {
               authorization: `Bearer ${token}`,
            },
         })

            .then(res => {

               console.log(res);
               cloudid = res.data[0].id;
               let cloudurl = "https://api.atlassian.com/ex/jira/" + cloudid + "/rest/api/2/issue/" + "JIR-1"
               console.log(cloudurl)

               getjiraissue(cloudurl)

            })
            .catch(error => console.log(error.message))


      }

      // build api url to access to project/issues (concat values), storage the new api url save that in variable and pass it as a variable to the (pass header to pass accesstoken as bearer)


      //call issue api to get all issues , atleast one issue 
      function getjiraissue(cloudurl) {
         axios
            .get(cloudurl, {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            })
            .then(res => {
               console.log(res.data.fields.summary)
               let arr = []
               let obj = {
                  key: res.data.key,
                  summary: res.data.fields.summary,
                  assignee: res.data.fields.assignee.displayName,
                  comment: "jira issue successfull"

               }

               arr.push(obj)
               setData(arr)
               console.log(arr)


            })
            .catch(error => console.log(error.message))
      }

   }, [])

   return (<div>
      <h1 align="center">JIRA-ISSUE-TABLE</h1>
      <MaterialTable
         title="JIRA"
         data={data}
         columns={columns}
      /></div>)

}


export default Home;


