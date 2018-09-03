const apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

class Commit {
  constructor (options) {
    this.htmlUrl = options.html_url
    this.sha = this.sliceSha(options.sha)
    this.commitMessage = this.truncateCommitMessage(options.commit.message)
    this.authorName = options.commit.author.name
    this.authorHtmlUrl = options.commit.author.html_url
    this.editDate = this.formatDate(options.commit.author.date)
  }

  sliceSha (sha) {
    return sha.slice(0, 7)
  }

  truncateCommitMessage (commitMessage) {
    const newLine = commitMessage.indexOf('\n')
    return newLine > 0 ? commitMessage.slice(0, newLine) : commitMessage
  }

  formatDate (editDate) {
    return editDate.replace(/T|Z/g, ' ')
  }

}

const vm = new Vue({
  el: '#demo',
  data: {
    branchs: ['master', 'dev'],
    currentBranch: 'master',
    commits: null
  },
  created: function () {
    this.fetchData(this.currentBranch)
  },
  watch: {
    currentBranch: function (newBranch) {
      this.fetchData(newBranch)
    }
  },
  methods: {
    fetchData: function (currentBranch) {
      axios.get(`${apiURL}${currentBranch}`).then(res => {
        return res.data
      }).then(commits => {
        this.commits = commits.map(commit => {
          return new Commit(commit)
        })
      }).catch(err => console.error(err))
    }
  }
})