// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import Autocomplete from '@mui/material/Autocomplete';
// import './FreeSolo.css';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import { InputAdornment } from '@mui/material';
// // import { Searchicon } from '../../Assets';
// // import InputAdornment from '@mui/material/InputAdornment';
// import { Grid } from '@material-ui/core';
// import { getTaggingServices } from "../../Shared/Services/Tagging";
// import toastMessage from "../../Shared/Components/Toast/Toast"




// export default function FreeSolo({ setData, title1, value, setValue, data }) {
//   // 

//   const [tagsArr, setTagsArr] = useState({});
//   const [inputValue, setInputValue] = React.useState('');
//   const [options, setOptions] = React.useState([]);

//   const handleTags = () => {

//     getTaggingServices()
//       // .then(({res:{res}})=>{
//       //   
//       //   setTagsArr(res[0])
//       // })
//       .then(({ data: { data } }) => {
//         setTagsArr(data)
//       })
//       .catch((e) => {
//         toastMessage("error", "Ohho");
//       });

//   }

//   useEffect((i) => {
//     handleTags();
//   }, [])
//   // 

//   // 

//   return (
//     //   <>
//     //   jasdlkfjlaskdfjklasjdf
//     //   </>
//     <div className='autoComp'>

//       <Stack spacing={2} sx={{ width: 300 }}>
//         {/* <Autocomplete
//         id="free-solo-demo"
//         freeSolo
//         options={top100Films.map((option) => option.title)}
//         renderInput={(params) => <TextField {...params} label="Search Field" />}
//       /> */}


//         {/* <Grid container alignItems="center" wrap="nowrap"> */}
//         {
//           // 

//         }
//         <Autocomplete

//           // inputValue={value?.title}
//           inputValue={inputValue ? inputValue : ""}
//           key={value?.title}
//           // value={value?.title}
//           // onChange={(event, newValue) => {
//           //   
//           //   if (typeof newValue.service == 'string') {
//           //     setValue({
//           //       title: event.target.value,
//           //     });
//           //     setData(newValue.service)
//           //   } else if (newValue.service && newValue.inputValue) {
//           //     // Create a new value from the user input
//           //     setValue({
//           //       title: event.target.value,
//           //     });
//           //     setData(newValue.service)
//           //   } else {
//           //     setValue(event.target.value);
//           //     setData(newValue.service)
//           //   }

//           // }}
//           // onInputChange={(event,value)=>{
//           //   
//           // }}
//           freeSolo
//           autoSelect={true}
//           // selectOnFocus
//           id={title1 == "posts" ? "infreeSolo2" : title1 == "Your Services" ? "infreeSolo2" : title1 == "Familiar Chemical Service Product" ? "infreeSolo2" : "infreesolo"}
//           disableClearable
//           options={tagsArr}
//           //   onChange={(event, newValue) => {
//           //   
//           //   setOptions(newValue ? [newValue, ...options] : options);
//           //   setData(newValue.service);
//           //   if(newValue.service=="string"){
//           //     setValue({title:event.target.value})
//           //   }
//           // }}
//           onInputChange={(event, newInputValue) => {
//             
//             // 
//             setInputValue(newInputValue);
//             setData(event.target.value);
//             // setData(newInputValue)
//             if (typeof event.target.value === 'string') {
//               setValue({ title: event.target.value })
//               setInputValue("")
//             }

//           }}
//           autoComplete
//           getOptionLabel={option => option.service}
//           // options={tagsArr.map((option) => option)}
//           // filterOptions={(opt)=>opt}
//           // onInputChange={tagsArr}
//           // open={open}
//           renderInput={(params) => (

//             <TextField
//               {...params}
//               // value = ''

//               // label="Search input"
//               placeholder={title1 == "Your Services" ? "Search service to add" : title1 == "Familiar Products" ? "Search products to add" : title1 == "Familiar Chemical Service Product" ? "Search chemical to add" : "Search services to add"}
//               margin='auto'

//               InputProps={{
//                 ...params.InputProps,
//                 type: 'search',
//                 startAdornment: (
//                   <InputAdornment position='start'>
//                     <SearchIcon className='search_imag' />
//                   </InputAdornment>

//                 ),
//               }}
//               fullWidth
//             />
//           )}
//         />
//         {/* </Grid> */}

//       </Stack>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
// import './FreeSolo.css';
// import { getTaggingServices } from "../../Shared/Services/Tagging";
// import { toastMessage } from "../../Shared"
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { setServiceQuery } from '../../Shared/Redux/reducers/serviceQuerySlice'
import { Searchicon } from '../../Assets';
// import { Searchicon } from '../../Assets';
// import InputAdornment from '@mui/material/InputAdornment';
import { Grid } from '@material-ui/core';
import { Field } from 'formik';
// import './FreeSolo.css'
import { getTaggingServices } from "../../Shared/Services/Tagging";
import toastMessage from "../../Shared/Components/Toast/Toast";
import Products from "./Products.json";
import Services from "./Services.json"
import { useSelector, useDispatch } from "react-redux";
import { color } from '@mui/system';



export default function FreeSolo({ livetest,livetest1,livetest2,livetest3, setData, title1, value, setValue, data, bool1, checkipt, arr,jobtitleCheck,setSelectService }) {
  const dispatch = useDispatch()
  const [tagsArr, setTagsArr] = useState([]);
  const [bool, setBool] = useState(data?.length > 0 ? true : false)
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [iptValue, setIptValue] = useState("");
  const userResp = useSelector((state) => state.root.user);


  // 
  let arrClone = [];
  if(arr[0]?.service){
     arrClone = arr?.filter((e) => 
    e?.service?.toLowerCase().includes(data?.toLowerCase())
  );
  // setTagsArr(arrClone)
  }
  else{
    arrClone = arr?.filter((e) => 
    e?.toLowerCase().includes(data?.toLowerCase())
  );
  // setTagsArr(arrClone)
  }
 



  const handleTags = () => {
    // getTaggingServices()
    // .then(({res:{res}})=>{
    //   
    //   setTagsArr(res[0])
    // })
    // .then(({ data: { data } }) => {

    //   
    //   setTagsArr(data)
    // })
    // .catch((e) => {
    //   toastMessage("error", "Ohho");
    // });

    // 

    // if (title1 = "Familiar Products") {
    //   setTagsArr(Products)
    // }
    // else if (title1 == "Your Services") {
    //   setTagsArr(Services)
    // }

    setTagsArr(arrClone)

  }
  useEffect((i) => {
    handleTags();
  }, [arrClone.length])





  return (
    <>
    {tagsArr[0]?.service?
      <>
    <Stack spacing={2} sx={{ width: 300 }}>
       <Autocomplete
       className={title1 == "posts" ? 'tagsArrTags' : ""}
       freeSolo
       disableClearable
       inputValue={data ? data : iptValue ? iptValue:"" }
       // value={data}
       id="free-solo-2-demo"
       onInputChange={(e, value) => {
         if ((e?.type == "keydown" || e?.type == undefined) || e == null) {
           setData(value);
           dispatch(setServiceQuery({service:value}))
           setIptValue(value);
         }else if(e?.type == "click"){
          
          // 
          if(setSelectService){
                setSelectService(e.target?.innerText)
              }
         } else {
           if (e?.target?.innerText) {
             setData(e.target.innerText)
             dispatch(setServiceQuery({service:e.target.innerText}))
             setIptValue("")
           }
           else {
             setIptValue(e.target.value)
             setData(e.target.value)
             dispatch(setServiceQuery({service:e.target.value}))
           }
           setIptValue("")
         }
         setIptValue("")
         if(setSelectService && value == ""){
          setSelectService("")
          dispatch(setServiceQuery({service:value}))
         }
       }
       }
       
      //  onSelect={(eve)=>{
      //   if(setSelectService){
      //     setSelectService(eve.target.value)
      //   }
        
      //  }}
       getOptionLabel={(option) => option.service}
       renderOption={(props, option) => (
        <Box component="li" {...props} key={option._id}>
          {option.service}
        </Box>
      )}
       options={arrClone ? arrClone :[]}
    

       renderInput={(params) => (
         <TextField
           className={livetest ? "livetest" : ""}
           {...params}
           // placeholder={userResp.user.role == "owner" ? "Add Services": "Search services"}
           placeholder={title1 ==="Familiar Products" ? "Add Familiar Products" : title1==="Your Services" ? "Add Services" : title1 === "Job Title" ? "Add Job Title" : title1 === "Search Job Title" ?  'Search Job Title' : livetest1 ? "Search Services":livetest2 ?  "Search Services" :livetest3 ? "Search Services" : "Add Services"}
           InputProps={{
             ...params.InputProps,
             type: 'search',
             startAdornment: (
               <InputAdornment position='start'>
                 <SearchIcon />
               </InputAdornment>
             )

           }}
         />
       )}
     />
    </Stack>
    </>
    :
    <Stack spacing={2} sx={{ width: 300 }}>
    <Autocomplete
    className={title1 == "posts" ? 'tagsArrTags' : ""}
    freeSolo
    disableClearable
    inputValue={data ? data : iptValue}
    // value={data}
    id="free-solo-2-demo"
    filterSelectedOptions={(res)=>{
      
    }}
    onInputChange={(e, value) => {
      
      if ((e?.type == "keydown" || e?.type == undefined) || e == null) {
        setData(value);
        dispatch(setServiceQuery({service:value}))
        setIptValue(value);
      } else {
        if (e?.target?.innerText) {
          setData(e.target.innerText)
          if(!jobtitleCheck){

            dispatch(setServiceQuery({service:e.target.innerText}))
          }
          if(setSelectService){

            setSelectService(e.target.innerText)
          }
          setIptValue("")
        }
        else {
          setIptValue(e.target.value)
          setData(e.target.value)
          if(!jobtitleCheck){

            dispatch(setServiceQuery({service:e.target.innerText}))
          }
          if(setSelectService){

            setSelectService(e.target.innerText)
          }
          // dispatch(setServiceQuery({service:e.target.innerText}))
        }
        setIptValue("")
      }
      setIptValue("")
    }
    }
    
    options={tagsArr && tagsArr?.map((option) => option)}
            // {

    renderInput={(params) => (
      <TextField
        className={livetest ? "livetest" : ""}
        {...params}
        // placeholder={userResp.user.role == "owner" ? "Add Services": "Search services"}
        placeholder={title1 ==="Familiar Products" ? "Add Familiar Products" :title1==="Your Services" ? "Add Services" : title1==="Job Title" ? "Add Job Title":  title1 === "Search Job Title" ?  'Search Job Title': livetest1 ? "Search Services":livetest2 ?  "Search Services" :livetest3 ? "Search Services" : "Add Services"}
        InputProps={{
          ...params.InputProps,
          type: 'search',
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )

        }}
      />
    )}
  />
 </Stack>
      }
      </>
  );
}
