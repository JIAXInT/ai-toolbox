import { ref } from 'vue'

export function useContentGenerator() {
    const loading = ref(false)
    const generatedContent = ref({
        title: '小红书爆款标题',
        content: '这里是生成的正文内容... 输入主题点击生成试试看！',
        tags: ['#标签1', '#标签2'],
        bgStyle: 'bg-gradient-to-br from-pink-500 to-rose-500'
    })

    const styles = [
        'bg-gradient-to-br from-pink-500 to-rose-500',
        'bg-gradient-to-br from-purple-500 to-indigo-500',
        'bg-gradient-to-br from-cyan-500 to-blue-500',
        'bg-gradient-to-br from-emerald-500 to-teal-500',
        'bg-gradient-to-br from-orange-400 to-red-500',
    ]

    const templates = [
        { id: 'simple-gradient', name: '简约渐变', componentName: 'SimpleGradient' },
        { id: 'bold-typography', name: '大字报', componentName: 'BoldTypography' },
        { id: 'modern-business', name: '现代商务', componentName: 'ModernBusiness' },
        { id: 'flowing-tech', name: '流动科技', componentName: 'FlowingTechBlue' },
    ]

    const currentTemplate = ref(templates[0])

    const checkSensitiveContent = (text) => {
        // Mock sensitive words list for demonstration
        const sensitiveWords = ['暴力', '血腥', '赌博', '诈骗', '违规']
        if (!text) return []
        return sensitiveWords.filter(word => text.includes(word))
    }

    const generate = async (topic) => {
        loading.value = true
        try {
            const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
            const endpoint = import.meta.env.VITE_DEEPSEEK_ENDPOINT
            const model = import.meta.env.VITE_DEEPSEEK_MODEL

            const prompt = `
        你是一位拥有百万粉丝的小红书博主，擅长创作爆款笔记。请根据主题"${topic}"创作一张封面卡片的内容。
        
        要求：
        1. 标题：极具吸引力，采用"二极管标题法"（如：后悔没早知道...、绝了...、必看...），包含数字或情感词，严格控制在20个字符以内。
        2. 正文：精炼的封面文案。口语化，语气活泼，多用Emoji。分点陈述核心价值（如：1️⃣... 2️⃣...），直击痛点或爽点。严格控制在1000字以内。
        3. 标签：3-5个高热度标签。
        4. 安全合规：绝对禁止包含暴力、血腥、赌博、诈骗等违规敏感内容。
        
        请直接返回 JSON 格式数据，不要包含 markdown 格式标记，格式如下：
        {
          "title": "标题内容",
          "content": "正文内容",
          "tags": ["#标签1", "#标签2"]
        }
      `

            const callApi = async (currentPrompt) => {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            { role: 'user', content: currentPrompt }
                        ],
                        temperature: 0.7
                    })
                })

                if (!response.ok) {
                    throw new Error('API request failed')
                }

                const data = await response.json()
                return data.choices[0].message.content
            }

            let contentStr = await callApi(prompt)

            // Parse JSON
            let parsedData
            try {
                const cleanContent = contentStr.replace(/```json\n?|\n?```/g, '').trim()
                parsedData = JSON.parse(cleanContent)
            } catch (e) {
                console.error('JSON parse error:', e)
                parsedData = {
                    title: `${topic} 揭秘`,
                    content: contentStr.substring(0, 100),
                    tags: ['#小红书', `#${topic}`]
                }
            }

            // Sensitive word check and optimization
            const sensitiveInTitle = checkSensitiveContent(parsedData.title)
            const sensitiveInContent = checkSensitiveContent(parsedData.content)

            if (sensitiveInTitle.length > 0 || sensitiveInContent.length > 0) {
                console.warn('Sensitive content detected, optimizing...', { sensitiveInTitle, sensitiveInContent })
                const fixPrompt = `
          上一次生成的内容包含敏感词（${[...sensitiveInTitle, ...sensitiveInContent].join(', ')}），请重新生成。
          主题：${topic}
          要求：
          1. 去除所有敏感违规内容，保持正能量。
          2. 标题20字以内。
          3. 正文1000字以内。
          4. 返回 JSON 格式。
        `
                contentStr = await callApi(fixPrompt)
                try {
                    const cleanContent = contentStr.replace(/```json\n?|\n?```/g, '').trim()
                    parsedData = JSON.parse(cleanContent)
                } catch (e) {
                    // If fix fails, just sanitize locally
                    if (parsedData.title) parsedData.title = parsedData.title.replace(new RegExp(sensitiveInTitle.join('|'), 'g'), '*')
                    if (parsedData.content) parsedData.content = parsedData.content.replace(new RegExp(sensitiveInContent.join('|'), 'g'), '*')
                }
            }

            // Hard limit enforcement
            if (parsedData.title && parsedData.title.length > 20) {
                parsedData.title = parsedData.title.substring(0, 20)
            }
            if (parsedData.content && parsedData.content.length > 1000) {
                parsedData.content = parsedData.content.substring(0, 1000)
            }

            const randomStyle = styles[Math.floor(Math.random() * styles.length)]

            generatedContent.value = {
                title: parsedData.title || '无标题',
                content: parsedData.content || '无内容',
                tags: parsedData.tags || [],
                bgStyle: randomStyle
            }
        } catch (error) {
            console.error('Generation failed:', error)
            alert('生成失败，请检查网络或稍后重试')
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        generatedContent,
        generate,
        templates,
        currentTemplate
    }
}
