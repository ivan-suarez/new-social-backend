const {Router} = require('express')
const postListItem = require('../models/PostItem')

const router = Router()

router.get('/', async(req, res) => {
    try {
        const postListItems = await postListItem.find()
    if(!postListItems) throw new Error('No postListItems')
    const sorted = postListItems.sort((a, b) =>{
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    res.status(200).json(sorted)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/', async(req, res) => {
    const newpostListItem = new postListItem(req.body)
    try {
        const postListItem = await newpostListItem.save()
        if (!postListItem) throw new Error('Something went wrong saving the postListItem')
        res.status(200).json(postListItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await postListItem.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await postListItem.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router