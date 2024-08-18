'use client'

import CustomTabPanel from '@/components/tab/CustomTabPanel'
import { theme } from '@/themes/mui-theme'
import { Block, CourseBlockData, CourseProgress, LearningSequence } from '@/utils/data-types'
import { isNOU } from '@/utils/null-check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, List, ListItem, Tab, Tabs, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react'

interface Props {
  courseId: string
  courseProgress: CourseProgress | null
  courseBlocks: CourseBlockData | null
  learningSequence: LearningSequence | null
}

const CourseStudy: FunctionComponent<Props> = ({ courseId, courseBlocks, courseProgress, learningSequence }) => {
  const [tabValue, setTabValue] = useState(0)
  const [currentBlockContent, setCurrentBlockContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const data = useState<CourseBlockData>(courseBlocks ?? { blocks: {} })
  const [nestedData, setNestedData] = useState<Block[]>([])

  useEffect(() => {
    const transformData = (blockId: string, data: CourseBlockData): Block => {
      const block = { ...data.blocks[blockId] }
      block.childrenBlocks = block.children.map(childId => transformData(childId, data))
      return block
    }

    const newNestedData: Block[] = Object.keys(data[0]).map(blockId => transformData(blockId, data[0]))
    setNestedData(newNestedData)

    const blockId = Object.keys(data[0])[0]
    fetchBlockContent(blockId).catch((e) => console.error(e))
  }, [data])

  const transformBlocks = (data: CourseBlockData): CourseBlockData => {
    const blocks = data.blocks
    const rootBlocks: Block[] = []

    const blockIds = new Set(Object.keys(blocks))
    const childIds = new Set(Object.values(blocks).flatMap(block => block.children))

    // Root blocks are blocks that are not children of any other blocks
    blockIds.forEach(blockId => {
      if (!childIds.has(blockId)) {
        rootBlocks.push(blocks[blockId])
      }
    })

    const getNestedChildren = (block: Block): Block => {
      block.childrenBlocks = block.children.map(childId => {
        const childBlock = blocks[childId]
        return getNestedChildren(childBlock)
      })
      return block
    }

    rootBlocks.forEach(rootBlock => getNestedChildren(rootBlock))

    return { blocks }
  }

  const handleTabChange = (event: SyntheticEvent, newValue: number): void => {
    setTabValue(newValue)
  }

  const fetchBlockContent = async (blockId: string): Promise<void> => {
    setLoading(true)
    try {
      const res = await axios.get<any>(`/api/blocks?id=${blockId}`, {
        headers: {
          Cookie: document.cookie
        }
      })
      setCurrentBlockContent(res.data.content)
      setLoading(false)
    } catch (error: any) {
      console.error(error?.response?.data ?? error)
      setCurrentBlockContent(null)
      setLoading(false)
    }
  }

  const transformedData = transformBlocks(courseBlocks ?? { blocks: {} })

  const rootBlocks = Object.values(transformedData.blocks).filter(
    block => !Object.values(transformedData.blocks).some(b => b.children.includes(block.id))
  )

  const renderBlocks = (block: Block): JSX.Element => {
    return (
      <Accordion key={block.id} sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <Typography>{block.display_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!isNOU(block?.childrenBlocks) && block.childrenBlocks.length > 0
            ? (
              <List>
                {block.childrenBlocks.map(child => (
                  <ListItem key={child.id}>
                    {renderBlocks(child)}
                  </ListItem>
                ))}
              </List>
              )
            : (
              <Typography>
                <Link href='#'>{block.display_name}</Link>
              </Typography>
              )}
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <div className='flex flex-col justify-start w-full'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label='Study Page Tabs'>
            <Tab label='Course' />
            <Tab label='Progress' />
          </Tabs>
        </Box>
        <div className='flex w-full pt-4'>
          {!isNOU(rootBlocks)
            ? (
              <Box sx={{
                width: '20%',
                borderRight: 1,
                borderColor: 'divider',
                height: 'calc(100vh - 250px)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '3px'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}
              >
                {Object.values(nestedData).map(block => renderBlocks(block))}
              </Box>
              )
            : (
              <div className='text-white'>
                No course block found.
              </div>
              )}
          <Box sx={{ p: 3, flexGrow: 1 }}>
            {loading
              ? (
                <CircularProgress />
                )
              : (
                <div>{currentBlockContent}</div>
                )}
          </Box>
        </div>
        <CustomTabPanel value={tabValue} index={1}>
          <div className='text-white'>
            <div className='text-nowrap text-white w-full text-2xl mb-4 pl-2 font-bold'><span>Course Progress</span></div>
            {!isNOU(courseProgress)
              ? (
                <div className='text-white'>
                  {/* Add more details about the course progress here */}
                </div>
                )
              : (
                <p className='text-white'>No progress data available.</p>
                )}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default CourseStudy
