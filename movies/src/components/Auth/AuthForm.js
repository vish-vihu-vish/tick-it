import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const lableStyle={
    mt:1,
    mb:1
}
function AuthForm({onSub,isAdmin}) {
    const [isSignup, setisSignup] = useState(true);
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:""
    });
    const HandleChage=(e)=>{
        setInputs((prev)=>({
            ...prev,
                [e.target.name]:e.target.value,
        })
        )
    }
    const HandleSubmit=(e)=>{
        e.preventDefault();
        console.log(e)
        onSub({inputs,signup:!isSignup});
    }
  return (
    <Dialog PaperProps={{style:{borderRadius:20}}} open={true}>
    <Box sx={{bgcolor:'whitesmoke'}}>
    <Box margin={"auto"} padding={1} textAlign={"center"} bgcolor={"#2b2d42"} >
        <Typography fontFamily="cursive" variant='h4' color={"white"} >
            {isSignup?"Login":"Sign Up"}
            <IconButton LinkComponent={Link} to="/" sx={{float:'right',color:"white"}}>
                <CloseOutlinedIcon/>
            </IconButton>
        </Typography>
        </Box>
        <form  onSubmit={HandleSubmit}  autoComplete="off">
            <Box padding={6} paddingBottom={8} display={"flex"} justifyContent={"space-evenly"} flexDirection={"column"} width={400} margin={"auto"}  alignContent={"center"}>
                {!isAdmin && !isSignup && <><FormLabel sx={lableStyle}>Name</FormLabel>
                <TextField onChange={HandleChage} margin='normal' variant='standard' type='text' name='name' value={inputs.name} />
                </>}
                <br/>
                <FormLabel sx={lableStyle}>Email</FormLabel>
                <TextField onChange={HandleChage} margin='normal' variant='standard' type='email' name='email' value={inputs.email}  />
                <br/>
                <FormLabel sx={{mt:1,mb:1}} >Password</FormLabel>
                <TextField onChange={HandleChage} margin='normal' variant='standard' type='password' name='password' value={inputs.password} />
                <Button type='submit' variant='contained' sx={{mt:2,borderRadius:10,bgcolor:"#2b2d42",color:"white",":hover":{color:"black"}}} >{isSignup?"Login":"Sign Up"}</Button>
                {!isAdmin && <Button onClick={()=>{setisSignup(!isSignup)}} sx={{mt:2}}>Switch To {isSignup?"Sign up":"Login"}</Button>}
            </Box>
        </form>
        </Box>
    </Dialog>
  )
}

export default AuthForm