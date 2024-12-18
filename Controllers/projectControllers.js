const projects= require('../Models/projectSchema')


exports.addProjectAPI=async(req,res)=>{
    const {title,language,github,website,overview}=req.body
    const projectImg=req.file.filename
    const userId=req.payload
    
    
    // console.log(title,projectImg,userId);
    try {
        const project = await projects.findOne({ github });

        if(project) {
            return res.status(400).json({ message: "Project already exists" })
        }else{
            const newProject = new projects({
                title:title,
                language:language,
                github:github,
                website:website,
                overview:overview,
                projectImg:projectImg,
                userId:userId
            })
            await newProject.save()
            res.status(201).json({newProject:newProject,message:"data added successfully"})
        }
    } catch (error) {
       res.status(500).json(error)
    }
    
}


exports.getAllUserProjectsAPI= async(req,res)=>{
    const searchKey=req.query.search
    const query={
        title:{
            $regex:searchKey,
            $options:'i'
        }
    }
    try{
        const allUserProject = await projects.find(query)
        res.status(200).json(allUserProject)
    }catch(error){
        res.status(500).json({error:'server error'})
    }
}

exports.getHomeProjectAPI=async(req,res)=>{
    
    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }catch(error){
        res.status(500).json({error:'server error'})
    }
}

exports.getUserProjectAPI=async(req,res)=>{
    try{
        const userId= req.payload
        const userProjects= await projects.find({userId})
        if(!userProjects){
            return res.status(400).json({message:'no project '})
        }
        res.status(200).json(userProjects)
    }catch(error){
        res.status(500).json({error:'server error'})
    }
}


exports.editProjectAPI=async(req,res)=>{
    const {title,language,github,website,overview,projectImg}=req.body
    const updatedProjectImg=req.file?req.file.filename:projectImg
    const userId=req.payload
    const {projectId}= req.params
    
    console.log(projectId);
    try {
        console.log(projectId);
        
        const project = await projects.findOne({_id:projectId });
        
        if(!project) {
            console.log('inside if');
            return res.status(400).json({ message: "Project doesnot exists" })
        }else{
            console.log('inside else');
            
            const updatedProject = await projects.findByIdAndUpdate({_id:projectId},{
                title:title,
                language:language,
                github:github,
                website:website,
                overview:overview,
                projectImg:updatedProjectImg
            },)
            await updatedProject.save()
            res.status(201).json(updatedProject)
        }
    } catch (error) {
       res.status(500).json({message:'interal server error'})
    }
    
}

exports.deleteProjectAPI=async(req,res)=>{
    const {projectId}= req.params
    const userId=req.payload
    console.log(projectId);
    
    try {

        const project = await projects.findOneAndDelete({_id:projectId},{new:true})
        res.status(200).json(project)
    }catch(error){
        res.status(500).json({error:'server error'})
    }
        
       
}