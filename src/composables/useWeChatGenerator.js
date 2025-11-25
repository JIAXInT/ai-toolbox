import { ref } from 'vue'

export function useWeChatGenerator() {
    const loading = ref(false)
    const generatedContent = ref(null)
    const error = ref(null)

    const generate = async (topic) => {
        loading.value = true
        generatedContent.value = null
        error.value = null

        try {
            const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
            const endpoint = import.meta.env.VITE_DEEPSEEK_ENDPOINT
            const model = import.meta.env.VITE_DEEPSEEK_MODEL

            if (!apiKey || !endpoint) {
                throw new Error('API 配置缺失，请检查 .env 文件是否正确配置')
            }

            const prompt = `
你是一位真实的人类作者，正在为微信公众号撰写一篇关于"${topic}"的文章。

【核心要求】
1. 写作风格：
   - 用第一人称或第二人称，像和朋友聊天一样自然
   - 避免"首先、其次、最后"这种教科书式的表达
   - 不要用"综上所述"、"总而言之"这类总结套话
   - 可以用口语化的表达，比如"说实话"、"你可能会想"、"我发现"
   - 适当加入个人观察、真实案例或具体场景描写

2. 内容结构：
   - 标题要有吸引力但不夸张，30字以内，避免"震惊！"、"必看！"这类标题党
   - 开头用一个具体的场景、故事或问题引入，不要直接讲大道理
   - 正文分3-4个部分，每部分自然过渡，不要生硬分段
   - 结尾留有余味，可以是启发性问题或开放式思考，不要强行升华

3. 语言特点：
   - 句子长短结合，避免全是长句或短句
   - 多用具体例子而非抽象概念
   - 可以适当使用比喻、类比让内容更生动
   - 避免堆砌形容词和空洞的赞美
   - 不要过度使用"非常"、"十分"、"极其"这类强调词

4. 绝对禁止：
   - 机械式的"第一点、第二点、第三点"列举
   - "在当今社会"、"随着时代发展"这类套话开头
   - 过于正式的书面语，要像人在说话
   - 空洞的鸡汤和说教
   - 暴力、色情、赌博等违规内容

【输出格式】
直接返回 JSON，不要有任何 markdown 标记：
{
  "title": "文章标题（自然、有吸引力）",
  "content": [
    {
      "heading": "开篇（用场景或问题引入，不要叫"引言"）",
      "text": "内容..."
    },
    {
      "heading": "第一个话题点（用自然的小标题，不要编号）",
      "text": "内容..."
    },
    {
      "heading": "第二个话题点",
      "text": "内容..."
    },
    {
      "heading": "收尾（自然结束，可以是思考或展望）",
      "text": "内容..."
    }
  ]
}

字数控制在1200-1500字，让读者感觉这是一个真人在分享自己的思考和观察。
      `

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model || 'deepseek-chat',
                    messages: [
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    stream: false
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error?.message || `API 请求失败 (${response.status})`)
            }

            const data = await response.json()
            const contentStr = data.choices[0].message.content

            // Parse JSON
            let parsedData
            try {
                const cleanContent = contentStr.replace(/```json\n?|\n?```/g, '').trim()
                parsedData = JSON.parse(cleanContent)
            } catch (e) {
                console.error('JSON parse error:', e)
                // Fallback for parsing failure
                parsedData = {
                    title: `${topic}：深度解析`,
                    content: [
                        { heading: '生成内容解析失败', text: contentStr }
                    ]
                }
            }

            generatedContent.value = {
                title: parsedData.title || '无标题',
                content: Array.isArray(parsedData.content) ? parsedData.content : [],
                coverUrl: '' // Cover will be generated separately
            }

        } catch (err) {
            console.error('Generation failed:', err)
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        generatedContent,
        error,
        generate
    }
}
