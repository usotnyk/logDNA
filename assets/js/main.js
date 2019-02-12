var detailViewTemplate1 = "<h2>Excepteur sint occaecat cupidatat non proident.<h2>"
detailViewTemplate1 +=    "<h3><em>Duis aute irure dolor in reprehenderit.</em></h3>"
detailViewTemplate1 +=    "<hr>"
detailViewTemplate1 +=    "<p><span class='first-letter'>N</span>am libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>"
detailViewTemplate1 +=    "<img width='500' height='200' alt='Placeholder' class='text-center' src='https://via.placeholder.com/500x200' />"
detailViewTemplate1 +=    "<div class='img-description'>At vero eos et accusamus et iusto.</div>"
detailViewTemplate1 +=    "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>"

var detailViewTemplate2 = "<h2>Duis aute irure dolor in reprehenderit.<h2>"
detailViewTemplate2 +=    "<h3><em>Excepteur sint occaecat cupidatat non proident.</em></h3>"
detailViewTemplate2 +=    "<hr>"
detailViewTemplate2 +=    "<p><span class='first-letter'>S</span>ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>"
detailViewTemplate2 +=    "<img width='300' height='200' alt='Placeholder' class='text-center' src='https://via.placeholder.com/300x200' />"
detailViewTemplate2 +=    "<div class='img-description'>At vero eos et accusamus et iusto.</div>"
detailViewTemplate2 +=    "<p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>"
detailViewTemplate2 +=    "<img width='300' height='300' alt='Placeholder' class='text-center' src='https://via.placeholder.com/300x200' />"
detailViewTemplate2 +=    "<div class='img-description'>At vero eos et accusamus et iusto.</div>"

function renderError() {
  $('.error-message').show();
}

function removeLoader(selector) {
  $(selector).removeClass('loading');
}

function renderChannelTab(tab, clone, parentListId) {
  var copy = $(clone).clone();
  $(copy).removeAttr('id');
  $(copy).attr('href', '#' + tab.channelId);
  $(copy).find('h4').text(tab.channelName);
  $(copy).find('.sub-header').text(tab.channelSubHeader);
  $('#channelList'+parentListId).append(copy[0].outerHTML);
  var parent = $('#channelList'+parentListId);
  $(parent).find('#cloneChannelTab').remove();
}

function renderChannelTabContent(tab, clone, parentListId) {
  var copy = $(clone).clone();
  $(copy).attr('id', tab.channelId);
  $(copy).html(tab.channelContent);
  $('#channelTabsContent'+parentListId).append(copy[0].outerHTML);
  var parent = $('#channelTabsContent'+parentListId);
  $(parent).find('#cloneChannelTabContent').remove();
}

function renderWorkspaceTab(tab, clone) {
  var copy = $(clone).clone();
  $(copy).removeAttr('id');
  $(copy).attr('href', '#' + tab.workspaceId);
  $(copy).find('.workspace-counter').text(tab.workspaceName);
  $('#workspaceList').append(copy[0].outerHTML);
}

function renderWorkspaceTabContent(tab, clone) {
  var copy = $(clone).clone();
  $(copy).attr('id', tab.workspaceId);
  $(copy).find("#channelList").attr('id', 'channelList'+tab.workspaceId)
  $(copy).find("#channelTabsContent").attr('id', 'channelTabsContent'+tab.workspaceId);
  $('#workspaceTabsContent').append(copy[0].outerHTML);
  var cloneChannelTab = $('#cloneChannelTab');
  var cloneChannelTabContent = $('#channelTabsContent #cloneChannelTabContent');

  tab.content.forEach(function(channelTab) {
    renderChannelTab(channelTab, cloneChannelTab, tab.workspaceId)
    renderChannelTabContent(channelTab, cloneChannelTabContent, tab.workspaceId)
  });
}

function cleanup() {
  //Remove clones
  $('#cloneWorkspaceTab').remove();
  $('#cloneWorkspaceTabContent').remove();

  // Add active class to first tabs and tab-panes
  $('#workspaceList').find('.list-group-item:first-child').addClass('active');
  $('#workspaceTabsContent').find('.tab-pane:first-child').addClass('active');
  $('.workspace-tabs .list-group').each(function() {
    $(this).find('.list-group-item:first-child').addClass('active');
  })
}

function renderWorkspaceTabs(data) {
  var cloneWorkspaceTab = $('#workspaceList #cloneWorkspaceTab');
  var cloneWorkSpaceTabContent = $('#workspaceTabsContent #cloneWorkspaceTabContent')
  data.forEach(function(tab) {
    renderWorkspaceTab(tab, cloneWorkspaceTab);
    renderWorkspaceTabContent(tab, cloneWorkSpaceTabContent);
  });
  cleanup();
}

function generateChannelsData({workspaceIndex, count}) {
  var channels = [];

  for (var i = 1; i <= count; i++) {
    channels.push({
      channelId: "WS" + workspaceIndex + "Channel" + i,
      channelName: workspaceIndex % 2 > 0 ? "Lorem Ipsum " + i : "Excepteur sint " + i,
      channelSubHeader: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      channelContent: i % 2 > 0 ? detailViewTemplate1 : detailViewTemplate2,
    })
  }

  return channels;
}

function generateWorkspaceData({workspaceIndex, channels}) {
  return {
    workspaceId: "workspace" + workspaceIndex,
    workspaceName: "" + workspaceIndex,
    content: generateChannelsData({workspaceIndex, count: channels}),
  };
}

function generateContentData({ workspaces, channels}) {
  var contentData = [];

  for (var i = 1; i <= workspaces; i++) {
    contentData.push(generateWorkspaceData({workspaceIndex: i, channels}));
  }

  return contentData;
}

$(document).ready(function() {
  var contentData = generateContentData({workspaces: 4, channels: 25});

  if(contentData && contentData.length > 0) {
    renderWorkspaceTabs(contentData);
    removeLoader('main');
  }
  else {
    $('main').hide();
    renderError();
  }
})