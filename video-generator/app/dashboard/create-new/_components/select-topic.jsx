'use client'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'

const SelectTopic = () => {
    const [selectedTopic, setSelectedTopic] = useState('')

    const topicOptions = [
        'Custom Prompt', 'Random AI Story', 'Animals Video', 'Study Based Video', 'Environment Videos',
        'Health and Fitness Videos', 'Food and Cooking Videos', 'Travel Videos', 'Technology Videos', 
        'Fashion Videos', 'Music Videos', 'Dance Videos', 'DIY Videos', 'Funny Videos', 
        'Inspirational Videos', 'Educational Videos', 'Product Review Videos', 'Vlog Videos', 
        'Unboxing Videos', 'Gaming Videos'
    ]

    return (
        <div>
            {/* Topic selection for generating video */}
            <h2 className='font-bold text-xl text-blue-800'>Video Content</h2>
            <p className='text-gray-500'>What is the topic of your videos</p>
            <Select onValueChange={(value) => setSelectedTopic(value)}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Select topic for video" value={selectedTopic} />
                </SelectTrigger>
                <SelectContent>
                    {topicOptions.map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedTopic=='Custom Prompt' && 
            <Textarea className='mt-3' placeholder='write Prompt which you want to create video' ></Textarea> }
        </div>
    )
}

export default SelectTopic
