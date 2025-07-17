<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <!-- 搜索表单 -->
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="searchForm"
          size="mini"
          class="search-form"
        >
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option
                v-for="item in dataDict.status"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="厂商">
            <el-select
              v-model="searchForm.manufacturer"
              placeholder="请选择厂商"
            >
              <el-option
                v-for="item in dataDict.manufacturer"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="问题级别">
            <el-select
              v-model="searchForm.problem_level"
              placeholder="请选择问题级别"
            >
              <el-option
                v-for="item in dataDict.problem_level"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="责任领域">
            <el-select
              v-model="searchForm.responsibility"
              placeholder="请选择责任领域"
            >
              <el-option
                v-for="item in dataDict.responsibility"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onSubmit"
            >查询</el-button>
            <el-button
              icon="el-icon-refresh"
              @click="resetForm"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <!-- 导入导出新增 -->
        <div class="btn-group">
          <div>
            <el-upload
              class="upload-btn"
              action="#"
              accept=".xlsx,.xls"
              :on-success="handleSuccess"
              :http-request="importExcel"
              :before-upload="beforeUpload"
              :show-file-list="false"
            >
              <el-button
                icon="el-icon-plus"
                class="is-plain"
                type="primary"
                size="mini"
              >导入</el-button>
            </el-upload>
            <el-button
              icon="el-icon-minus"
              class="is-plain"
              type="danger"
              size="mini"
              @click="exportToExcel"
            >导出</el-button>
          </div>
          <div>
            <el-button
              icon="el-icon-setting"
              type="success"
              size="mini"
              style="margin-right: 10px"
              @click="setTableHeader"
            >设置表头</el-button>
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="mini"
              style="margin-right: 10px"
              @click="handleClick('新增')"
            >新增</el-button>
          </div>
        </div>

        <!-- 表格 -->
        <el-table
          v-loading="listLoading"
          :data="tableData"
          element-loading-text="Loading"
          fit
          border
          highlight-current-row
          max-height="680"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" fixed width="50" />
          <template v-for="item in exemptTableHeaderList">
            <el-table-column
              v-if="item.is_select && (item.name !== 'problem_image' && item.name !== 'deal_image')"
              :key="item.name"
              :prop="item.name"
              :label="item.zh_name"
              :width="getWidth(item)"
            />

            <el-table-column
              v-else-if="item.is_select && (item.name === 'problem_image' || item.name === 'deal_image')"
              :key="item.zh_name"
              :label="item.zh_name"
              :width="getWidth(item)"
              class="image-column"
            >
              <template slot-scope="scope">
                <!-- 显示图片 -->
                <img v-if="scope.row[item.name]" :src="scope.row[item.name]" alt="图片加载失败" style="max-width: 160px; max-height: 160px; cursor: pointer;" @click="previewImageTable(scope.row, item.zh_name)">
                <div v-else>暂无图片</div>
                <!-- <img src="@/assets/Logo.png" alt="" style="max-width: 160px; max-height: 160px;"> -->

              </template>
            </el-table-column>
          </template>

          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClick('查看', scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleClick('编辑', scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :current-page="pageinfo.page"
            :page-sizes="[10, 20, 50]"
            :page-size="pageinfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageinfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 表头设置 -->
    <el-dialog
      title="表头设置"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleCloseHeaderDialog"
      class="header-dialog"
    >
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedTableHeader" @change="handleCheckedChange">
        <el-checkbox v-for="item in exemptTableHeaderList" :key="item.name" :label="item.name">{{ item.zh_name }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSetTableHeader">确 定</el-button>
        <el-button @click="cancelSetTableHeader">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 新增和编辑查看 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="formDialogVisible"
      :before-close="handleClose"
      class="form-dialog"
      append-to-body
    >
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="外设详情" name="1">
          <el-form
            class="form form-peripheral-details"
            :inline="false"
            :model="formData"
            label-width="70px"
          >
            <!-- label-width="180px" -->
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="厂商" label-width="40px">
                  <el-select
                    v-model="formData.manufacturer"
                    :disabled="disabled"
                    placeholder="厂商"
                  >
                    <el-option
                      v-for="item in dataDict.manufacturer"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外设品类">
                  <el-select
                    v-model="formData.category"
                    :disabled="disabled"
                    placeholder="外设品类"
                  >
                    <el-option
                      v-for="item in dataDict.category"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                  <!-- <el-input v-model="formData.category" :disabled="disabled" placeholder="外设品类" /> -->
                </el-form-item>
              </el-col>
              <!-- <el-col :span="2" /> -->
              <el-col :span="8">
                <el-form-item label="外设型号">
                  <el-input v-model="formData.model" :disabled="disabled" placeholder="外设型号" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="状态" label-width="40px">
                  <el-select v-model="formData.status" :disabled="disabled" placeholder="状态">
                    <el-option
                      v-for="item in dataDict.status"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="编号" label-width="40px">
                  <el-input v-model="formData.serial_number" class="no-arrow-number-input" type="number" :disabled="disabled" placeholder="编号" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-collapse-item>

        <el-collapse-item title="问题单详情" name="2">
          <el-form
            class="form form-Q-detail"
            :inline="false"
            :model="formData"
            label-width="70px"
          >
            <!-- label-width="180px" -->
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="发现人" label-width="55px">
                  <el-input v-model="formData.found_person" :disabled="disabled" placeholder="发现人" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="问题首发时间"
                  label-width="100px"
                >
                  <el-date-picker
                    v-model="formData.problem_first_found_time"
                    type="datetime"
                    placeholder="问题首发时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="测试环境-网络" label-width="101px">
                  <el-input v-model="formData.test_sys_network" :disabled="disabled" placeholder="测试环境-网络" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="问题单号" label-width="70px">
                  <el-input v-model="formData.problem_number" :disabled="disabled" placeholder="问题单号" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="问题级别" label-width="70px">
                  <el-select
                    v-model="formData.problem_level"
                    placeholder="问题级别"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.problem_level"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="问题概率" label-width="70px">
                  <el-input v-model="formData.problem_probability" :disabled="disabled" placeholder="问题概率" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="简要描述" label-width="70px">
                  <el-input v-model="formData.description" autosize type="textarea" :disabled="disabled" placeholder="简要描述" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="驱动名称/版本" label-width="100px">
                  <el-input v-model="formData.drive_version" :disabled="disabled" placeholder="驱动名称/版本" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测试环境(PC系统版本)" label-width="155px">
                  <el-input v-model="formData.test_sys_version" :disabled="disabled" placeholder="测试环境(PC系统版本)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="问题截图" label-width="70px">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="(params) => updateQImage(params, 'problem_image')"
                :on-success="handleQSuccess"
                :before-upload="beforeImageUpload"
                :disabled="disabled"
              >
                <div class="image-wrapper" @mouseenter="onMouseenter('问题截图')" @mouseleave="hover = false">
                  <img
                    v-if="formData.problem_image"
                    :src="formData.problem_image"
                    class="avatar"
                    @click.stop=""
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon" />

                  <!-- Hover 层叠按钮 -->
                  <div v-show="hover" class="overlay-buttons" @click.stop="">
                    <el-button
                      circle
                      size="mini"
                      icon="el-icon-zoom-in"
                      class="preview-btn"
                      @click.stop="previewImage('问题截图')"
                    />
                    <el-button
                      v-show="!disabled"
                      circle
                      size="mini"
                      icon="el-icon-upload2"
                      class="upload-btn"
                      @click.stop="triggerUpload('avatar-uploader')"
                    />
                  </div>
                </div>
              </el-upload>
            </el-form-item>

            <el-form-item label="处理截图" label-width="70px">
              <el-upload
                class="avatar-uploader deal-image-uploader"
                action="#"
                :show-file-list="false"
                :http-request="(params) => updateQImage(params, 'deal_image')"
                :on-success="handleQSuccess"
                :before-upload="beforeImageUpload"
                :disabled="disabled"
              >
                <div class="image-wrapper" @mouseenter="onMouseenter('处理截图')" @mouseleave="dealImageHover = false">
                  <img
                    v-if="formData.deal_image"
                    :src="formData.deal_image"
                    class="avatar"
                    @click.stop=""
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon" />

                  <!-- Hover 层叠按钮 -->
                  <div v-show="dealImageHover" class="overlay-buttons" @click.stop="">
                    <el-button
                      circle
                      size="mini"
                      icon="el-icon-zoom-in"
                      class="preview-btn"
                      @click.stop="previewImage('处理截图')"
                    />
                    <el-button
                      v-show="!disabled"
                      circle
                      size="mini"
                      icon="el-icon-upload2"
                      class="upload-btn"
                      @click.stop="triggerUpload('deal-image-uploader')"
                    />
                  </div>
                </div>
              </el-upload>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="对比测试" label-width="70px">
                  <el-input v-model="formData.contrast_test" autosize type="textarea" :disabled="disabled" placeholder="对比测试" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="问题分析与处理进展" label-width="140px">
                  <el-input v-model="formData.analysis_and_progress" autosize type="textarea" :disabled="disabled" placeholder="问题分析与处理进展" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任领域">
                  <el-select
                    v-model="formData.responsibility"
                    placeholder="责任领域"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.responsibility"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="问题详情">
                  <el-input v-model="formData.problem_details" autosize type="textarea" :disabled="disabled" placeholder="问题详情" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="问题根因">
                  <el-input v-model="formData.problem_reason" autosize type="textarea" :disabled="disabled" placeholder="问题根因" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="解决合入计划" label-width="100px">
                  <el-input v-model="formData.merge_plan" autosize type="textarea" :disabled="disabled" placeholder="解决合入计划" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合入版本">
                  <el-input v-model="formData.merge_version" :disabled="disabled" placeholder="合入版本" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="合入时间"
                >
                  <el-date-picker
                    v-model="formData.merge_date"
                    type="datetime"
                    placeholder="合入时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="影响评估(无法解决)" label-width="136px">
                  <el-input v-model="formData.impact_assessment" :disabled="disabled" placeholder="影响评估(无法解决)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="评审结论">
                  <el-input v-model="formData.review_conclusion" :disabled="disabled" placeholder="评审结论" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="豁免汇报与跟踪" name="3">
          <el-form
            class="form"
            :inline="false"
            :model="formData"
            label-width="70px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="汇报人(*工号必填)" label-width="125px">
                  <el-input v-model="formData.presenter" :disabled="disabled" placeholder="汇报人" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="汇报时间"
                >
                  <el-date-picker
                    v-model="formData.report_date"
                    type="datetime"
                    placeholder="汇报时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="评审会议&与会人" label-width="121px">
                  <el-input v-model="formData.review_meeting" autosize type="textarea" :disabled="disabled" placeholder="评审会议&与会人" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="问题影响">
                  <el-input v-model="formData.problem_impact" autosize type="textarea" :disabled="disabled" placeholder="问题影响" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="豁免分类">
                  <el-input v-model="formData.exempt_type" autosize type="textarea" :disabled="disabled" placeholder="豁免分类" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="豁免原因">
                  <el-input v-model="formData.exempt_reason" autosize type="textarea" :disabled="disabled" placeholder="豁免原因" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="会议意见">
                  <el-input v-model="formData.meeting_suggestion" autosize type="textarea" :disabled="disabled" placeholder="会议意见" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="豁免进展跟踪记录" label-width="129px">
                  <el-input v-model="formData.exempt_progress" autosize type="textarea" :disabled="disabled" placeholder="豁免进展跟踪记录" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-collapse-item>

        <el-collapse-item title="豁免申请" name="4">
          <el-form
            class="form"
            :inline="false"
            :model="formData"
            label-width="124px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="申请豁免产品清单">
                  <el-input v-model="formData.apply_exempt_list" :disabled="disabled" placeholder="申请豁免产品清单" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="申请豁免操作系统版本" label-width="152px">
                  <el-input v-model="formData.exempt_sys_version" :disabled="disabled" placeholder="申请豁免操作系统版本" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="申请豁免结束日" label-width="110px">
                  <el-date-picker
                    v-model="formData.exempt_end_date"
                    type="datetime"
                    placeholder="申请豁免结束日"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-collapse-item>

        <el-collapse-item title="豁免评审结果" name="5">
          <el-form
            class="form"
            :inline="false"
            :model="formData"
            label-width="124px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否豁免" label-width="70px">
                  <el-input v-model="formData.is_exempt" :disabled="disabled" placeholder="是否豁免" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="豁免通过产品清单">
                  <el-input v-model="formData.exempt_pass_list" :disabled="disabled" placeholder="豁免通过产品清单" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="豁免驳回产品清单">
                  <el-input v-model="formData.exempt_reject_list" :disabled="disabled" placeholder="豁免驳回产品清单" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="评审豁免操作系统版本" label-width="152px">
                  <el-input v-model="formData.review_exempt_sys_version" :disabled="disabled" placeholder="评审豁免操作系统版本" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="评审豁免结束日"
                >
                  <el-date-picker
                    v-model="formData.review_exempt_end_date"
                    type="datetime"
                    placeholder="评审豁免结束日"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="豁免遗留问题" name="6">
          <el-form
            class="form"
            :inline="false"
            :model="formData"
            label-width="70px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="跟踪人" label-width="54px">
                  <el-input v-model="formData.tracking_people" :disabled="disabled" placeholder="跟踪人" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="遗留事项">
                  <el-input v-model="formData.remaining_matters" :disabled="disabled" placeholder="遗留事项" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="无法解决的影响" label-width="110px">
                  <el-input v-model="formData.unresolved_impact" :disabled="disabled" placeholder="无法解决的影响" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="计划解决日" label-width="82px">
                  <el-date-picker
                    v-model="formData.plan_deal_date"
                    type="datetime"
                    placeholder="计划解决日"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="解决状态">
                  <el-input v-model="formData.deal_status" :disabled="disabled" placeholder="解决状态" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="解决版本">
                  <el-input v-model="formData.deal_version" :disabled="disabled" placeholder="解决版本" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-collapse-item>

        <el-collapse-item title="豁免有效性" name="7">
          <el-form
            class="form"
            :inline="false"
            :model="formData"
            label-width="54px"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="豁免有效性状态" label-width="110px">
                  <el-input v-model="formData.exempt_status" :disabled="disabled" placeholder="豁免有效性状态" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="生效日"
                >
                  <el-date-picker
                    v-model="formData.effective_date"
                    type="datetime"
                    placeholder="生效日"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="失效日"
                >
                  <el-date-picker
                    v-model="formData.expiry_date"
                    type="datetime"
                    placeholder="失效日"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="有效性备注" label-width="82px">
                  <el-input v-model="formData.effective_remark" autosize type="textarea" :disabled="disabled" placeholder="有效性备注" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-collapse-item>
      </el-collapse>

      <span v-if="!disabled" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addOrEditSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog class="image-dialog" :visible.sync="imageDialogVisible" width="80%" top="2vh">
      <img style="width: 100%;" :src="imageURL" alt="图片加载失败">
    </el-dialog>
  </div>
</template>

<script>

import {
  getExemptHeader,
  getExemptData,
  importExcel,
  exportExcel,
  saveHeaderConfig,
  deleteData,
  uploadImg,
  saveOrUpdateData
} from '@/api/exempt'
import {
  getDataDict
} from '@/api/form'

import { EXEMPT_DATE_TIME } from '@/utils/constant'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default {
  name: 'Exempt',
  data() {
    return {
      dialogVisible: false,
      exemptTableHeaderList: [],
      tableData: [],
      listLoading: false,
      EXEMPT_DATE_TIME,
      // 分页信息
      pageinfo: {
        page: 1,
        size: 10,
        total: 0
      },
      fileURL: '',
      searchForm: {
        status: '',
        manufacturer: '',
        problem_level: '',
        responsibility: ''
      },
      ids: [],
      dataDict: {},
      isIndeterminate: true,
      checkedTableHeader: [],
      checkAll: false,
      dialogTitle: '新增',
      rowVision: null,
      formDialogVisible: false,
      disabled: false,
      editID: null,
      formData: {},
      baseURL: process.env.VUE_APP_BASE_API,
      imageURL: '',
      imageDialogVisible: false,
      hover: false,
      dealImageHover: false,
      rules: {
        presenter: [
          { required: true, message: '请输入汇报人', trigger: 'blur' },
          { pattern: /^\d+$/, message: '工号必须为数字', trigger: 'blur' }
        ]
      },
      activeNames: ['1']

    }
  },
  computed: {

  },
  async created() {
    if (window.location.host !== 'localhost:9528') {
      this.baseURL = window.location.origin
    }
    await this.fetchDataDict()
    await this.fetchExemptTableHeader()
    await this.fetchExemptData()
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    onMouseenter(title) {
      // if (title === '问题截图') {
      //   if (this.formData.problem_image) {
      //     this.hover = true
      //   }
      // } else {
      //   if (this.formData.deal_image) {
      //     this.dealImageHover = true
      //   }
      // }
      title === '问题截图'
        ? this.formData.problem_image && (this.hover = true)
        : this.formData.deal_image && (this.dealImageHover = true)
    },
    previewImageTable(row, zh_name) {
      const imageURL = zh_name === '问题截图'
        ? row.problem_image : row.deal_image
      console.log(row, '预览图片行数据')

      if (!imageURL) return
      this.imageURL = imageURL
      this.imageDialogVisible = true
    },
    // 点击放大按钮执行的预览函数
    previewImage(title) {
      console.log('放大')
      this.imageURL = title === '问题截图'
        ? this.formData.problem_image : this.formData.deal_image
      this.imageDialogVisible = true
    },
    triggerUpload(className) {
      // 手动触发文件选择
      const input = document.querySelector(`.${className} .el-upload__input`)
      if (input) {
        input.click()
      }
    },
    beforeImageUpload(file) {
      const isJPG = file.type.includes('image/')
      if (!isJPG) {
        this.$message.error('只能上传图片格式!')
      }
      return isJPG
    },
    updateQImage({ file, onSuccess }, type) {
      console.log('上传图片:', type)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('problem_image', this.formData.problem_number)
      formData.append('type', type)

      uploadImg(formData)
        .then((res) => {
          console.log(res)
          if (type === 'problem_image') {
            this.formData.problem_image = this.baseURL + '/' + res.data.img_path
          } else {
            this.formData.deal_image = this.baseURL + '/' + res.data.img_path
          }
          if (onSuccess) {
            onSuccess(res, { status: 'success' })
          }
          this.$message.success('上传成功')
        })
        .catch((err) => {
          console.error('上传失败:', err)
        })
    },
    handleQSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw), 'file.raw')
      // this.imageURL = URL.createObjectURL(file.raw)
    },
    clearObjectValues(obj) {
      Object.keys(obj).forEach((key) => {
        obj[key] = ''
      })
      return obj
    },
    reset() {
      this.formDialogVisible = false
      this.formData = this.clearObjectValues(this.formData)
      this.activeNames = ['1']
    },
    cancel() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.reset()
        })
        .catch(_ => {})
    },
    handleClick(title, row) {
      this.dialogTitle = title
      if (title === '编辑') {
        this.assignSameKeys(row)
        this.disabled = false
        this.editID = row.id
        // this.rowVision = row.row_vision
      } else if (title === '查看') {
        this.assignSameKeys(row)
        this.disabled = true
      } else {
        this.disabled = false
        this.editID = null
        this.rowVision = null
      }
      this.formDialogVisible = true
    },
    /**
     *
     * @param source 目标源数据
     */
    assignSameKeys(source) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (!source[key] && source[key] !== 0) {
            this.formData[key] = ''
          } else {
            this.formData[key] = source[key].toString()
          }
        }
      }
    },
    /**
     * 新增或编辑提交操作
     */
    addOrEditSubmit() {
      const data = this.formatDateTimeFieldsForObject(this.formData)
      // if (this.dialogTitle === '编辑') {
      //   data.row_vision = this.rowVision
      // }
      data.problem_image = data.problem_image.includes(this.baseURL) ? data.problem_image.split(this.baseURL + '/')[1] : data.problem_image
      data.deal_image = data.deal_image.includes(this.baseURL) ? data.deal_image.split(this.baseURL + '/')[1] : data.deal_image
      data.serial_number = data.serial_number !== '' ? Number(data.serial_number) : null
      console.log('提交数据:', data.serial_number)

      saveOrUpdateData({ data, id: this.editID }).then(async(response) => {
        this.formDialogVisible = false
        this.dialogTitle === '新增'
          ? this.$message.success('新增成功')
          : this.$message.success('编辑成功')
        this.formData = this.clearObjectValues(this.formData)
        const params = this.getFetchDataParams()
        await this.fetchExemptData(params)
        this.reset()
      })
    },
    async submitSetTableHeader() {
      // 发请求
      this.listLoading = true
      if (this.checkAll) {
        this.exemptTableHeaderList.forEach(item => {
          item.is_select = true
        })
      } else {
        this.exemptTableHeaderList.forEach(item => {
          item.is_select = this.checkedTableHeader.includes(item.name)
        })
      }
      try {
        await saveHeaderConfig(this.exemptTableHeaderList)
        this.$message.success('保存成功')
        await this.fetchExemptTableHeader()
        this.dialogVisible = false
      } catch (error) {
        throw new Error(error.message)
      } finally {
        this.listLoading = false
      }
    },
    cancelSetTableHeader() {
      this.dialogVisible = false
    },
    handleCheckAllChange(val) {
      console.log(val, 'handleCheckAllChange')

      this.checkedTableHeader = val
        ? this.exemptTableHeaderList.map(item => item.name) : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      console.log(value, 'handleCheckedChange')
      const checkedCount = value.length
      this.checkAll = checkedCount === this.exemptTableHeaderList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.exemptTableHeaderList.length
    },
    handleCloseHeaderDialog(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClose(done) {
      if (this.dialogTitle === '查看') {
        this.reset()
        return
      }
      this.$confirm('确认关闭？')
        .then(_ => {
          this.reset()
          done()
        })
        .catch(_ => {})
    },
    setTableHeader() {
      this.checkedTableHeader = this.exemptTableHeaderList
        .filter(item => item.is_select)
        .map(item => item.name)
      this.dialogVisible = true
    },
    async fetchDataDict() {
      try {
        const res = await getDataDict()
        console.log(res, 'getDataDict')
        this.dataDict = res.data
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async onSubmit() {
      this.pageinfo.page = 1
      const params = this.getFetchDataParams()
      console.log('submit!', params)
      await this.fetchExemptData(params)
    },
    resetForm() {
      this.searchForm = {
        status: '',
        manufacturer: '',
        problem_level: '',
        responsibility: ''
      }
    },
    downloadExcel(response) {
      const contentDisposition = response.headers['content-disposition']
      let fileName = 'export.xlsx' // 默认文件名

      if (contentDisposition) {
        const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)/i
        const utf8Matches = contentDisposition.match(utf8FilenameRegex)
        if (utf8Matches && utf8Matches[1]) {
          fileName = decodeURIComponent(utf8Matches[1])
        } else {
          const asciiFilenameRegex = /filename="?([^"]+)"?/i
          const asciiMatches = contentDisposition.match(asciiFilenameRegex)
          if (asciiMatches && asciiMatches[1]) {
            fileName = asciiMatches[1]
          }
        }
      }

      const blob = new Blob([response.data], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        type: response.data.type
      })

      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      this.listLoading = false
      this.$message.success('导出成功')
    },
    exportToExcel() {
      this.listLoading = true
      const data = this.getExportExcelData()
      console.log('导出参数:', data)

      exportExcel(data)
        .then((response) => {
          console.log('导出结果:', response)
          this.downloadExcel(response)
        })
        .catch((error) => {
          console.error('导出错误:', error)
          this.$message.error('导出失败')
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    getExportExcelData() {
      const data = {
        status: this.searchForm.status,
        manufacturer: this.searchForm.manufacturer,
        problem_level: this.searchForm.problem_level,
        responsibility: this.searchForm.responsibility,
        ids: this.ids
      }
      return data
    },
    beforeUpload(file) {
      const isExcel =
        file.type === 'application/vnd.ms-excel' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isExcel) {
        this.$message.warning('上传文件只能是 xls 或 xlsx 格式!')
      }
      return isExcel
    },
    importExcel({ file }) {
      this.listLoading = true
      const formData = new FormData()
      formData.append('file', file)

      importExcel(formData)
        .then(async(res) => {
          console.log('导入结果:', res)
          this.listLoading = false
          this.$message.success(res.message)
          const params = this.getFetchDataParams()
          await this.fetchExemptData(params) // 刷新列表
        })
        .catch((err) => {
          console.error('导入错误:', err)
          this.$message.error('导入失败')
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    handleSuccess(res, file) {
      this.fileURL = URL.createObjectURL(file.raw)
      console.log(this.fileURL, 'this.fileURL')
    },
    // 对象处理
    formatDateTimeFieldsForObject(data) {
      const result = { ...data }
      for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue
        if (EXEMPT_DATE_TIME.includes(key)) {
          result[key] = data[key]
            ? dayjs(data[key]).format('YYYY-MM-DD HH:mm:ss')
            : null
        }
      }
      return result
    },
    // 数组处理
    formatFormData(data) {
      return data.map((item) => {
        const newItem = { ...item }
        Object.keys(item).forEach((key) => {
          if (EXEMPT_DATE_TIME.includes(key)) {
            const rawValue = item[key]
            const formattedValue = rawValue
              ? dayjs.utc(rawValue).format('YYYY-MM-DD HH:mm:ss')
              : null
            newItem[key] = formattedValue
          }
        })
        return newItem
      })
    },
    // TODO: 获取接口数据入参
    getFetchDataParams() {
      const params = {
        size: this.pageinfo.size,
        page: this.pageinfo.page,
        status: this.searchForm.status,
        manufacturer: this.searchForm.manufacturer,
        problem_level: this.searchForm.problem_level,
        responsibility: this.searchForm.responsibility
      }
      return params
    },
    /** 切换每页显示条数 */
    async handleSizeChange(val) {
      const params = this.getFetchDataParams()
      params.size = val
      await this.fetchExemptData(params)
    },
    /** 切换分页 */
    async handleCurrentChange(val) {
      const params = this.getFetchDataParams()
      params.page = val
      await this.fetchExemptData(params)
    },
    handleDelete(row) {
      this.$confirm('确认执行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          deleteData({ id: row.id }).then(async(response) => {
            this.$message.success('删除成功')
            this.listLoading = false
            const params = this.getFetchDataParams()
            await this.fetchExemptData(params)
          })
        })
        .catch(() => {})
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id)
      console.log(this.ids)
    },
    getWidth(item) {
      let width
      if (item.zh_name === '问题分析与处理进展') {
        width = '400px'
      } else if (item.zh_name === '外设型号' || item.zh_name === '简要描述') {
        width = '300px'
      } else if (item.zh_name === '问题截图' || item.zh_name === '处理截图') {
        width = '180px'
      } else {
        width = '100px' // 默认宽度
      }
      return width
    },
    async fetchExemptData(params) {
      try {
        this.listLoading = true
        const response = await getExemptData(params)
        this.tableData = this.formatFormData(response.data.data)
        this.tableData.forEach(item => {
          item.problem_image = item.problem_image ? this.baseURL + '/' + item.problem_image : ''
          item.deal_image = item.deal_image ? this.baseURL + '/' + item.deal_image : ''
        })
        this.pageinfo.total = response.data.total
        this.pageinfo.page = response.data.page
        this.pageinfo.size = response.data.size
        console.log(response, 'exemptData')
      } catch (error) {
        console.error('Error fetching exempt data:', error)
      } finally {
        this.listLoading = false
      }
    },
    async fetchExemptTableHeader() {
      try {
        const response = await getExemptHeader()
        this.exemptTableHeaderList = response.data
        this.formData = response.data.reduce((obj, item) => {
          obj[item.name] = ''
          return obj
        }, {})
        console.log(this.formData, 'formData')

        console.log(response, 'exemptTableHeaderList')
      } catch (error) {
        console.error('Error fetching exempt table header:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24px;

  .el-row {
    .el-input {
      width: 240px;
    }

    .block {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .delete-btn {
      margin-left: 10px;
    }

    .el-table {
      margin-top: 20px;
    }

    .el-menu-item {
      width: 100%;
      overflow: hidden;
    }
  }

  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    margin-left: 10px;

    .el-dropdown {
      margin-left: 10px;
    }

    .upload-btn {
      display: inline-block;
      margin-right: 10px;
    }
  }
}

.header-dialog {
  ::v-deep .el-dialog {
    .el-checkbox {
      margin-bottom: 10px;
    }

    .el-dialog__body {
      max-height: 500px;
      overflow: auto;
    }
  }
}

.form-dialog {
  ::v-deep .el-dialog {
    width: 98vw;
    height: 98vh;
    margin-top: 1vh !important;

    .el-dialog__title {
      font-size: 18px;
      font-weight: bold;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }

    .el-dialog__body {
      height: 85vh;
      overflow: auto;
    }
  }
}

.avatar-uploader {
  width: 100%;
  height: 100%;

  ::v-deep .el-upload {
    display: block;
    width: 192px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 192px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .avatar {
    display: flex;
    width: 192px;
    height: 108px;
    object-fit: cover;
  }

  .image-wrapper {
    position: relative;
    display: block;
  }

  .overlay-buttons {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    // gap: 8px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.6s ease;
  }

  .preview-btn,
  .upload-btn {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    // color: white;
    border: none;
    padding: 4px;
  }

  .preview-btn {
    left: 40%;
  }

  .upload-btn {
    left: 60%;
  }

}

.form-Q-detail,
.form-peripheral-details {
  .el-select {
    width: 100%;
  }
}

::v-deep .el-collapse-item__header {
  font-size: 16px;
  font-weight: bold;
}

.no-arrow-number-input {
  ::v-deep input[type="number"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

</style>
