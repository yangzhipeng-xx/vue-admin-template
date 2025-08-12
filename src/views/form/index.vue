<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-row>
      <el-col :span="24">
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="searchForm"
          size="mini"
          class="search-form"
        >
          <el-form-item label="品类">
            <el-select v-model="searchForm.category" placeholder="品类">
              <el-option
                v-for="item in dataDict.category"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="厂商(送测商)">
            <el-select
              v-model="searchForm.manufacturer"
              placeholder="厂商(送测商)"
            >
              <el-option
                v-for="item in dataDict.manufacturer"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="测试状态">
            <el-select
              v-model="searchForm.test_status"
              placeholder="测试状态"
            >
              <el-option
                v-for="item in dataDict.test_status"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="测试结论">
            <el-select
              v-model="searchForm.test_conclusion"
              placeholder="测试结论"
            >
              <el-option
                v-for="item in dataDict.test_conclusion"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="阻塞发证厂商问题状态">
            <el-select
              v-model="searchForm.is_certification"
              placeholder="阻塞发证厂商问题状态"
            >
              <el-option
                v-for="item in dataDict.is_certification"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否最新轮次">
            <el-select
              v-model="searchForm.is_new"
              placeholder="是否最新轮次"
            >
              <el-option
                v-for="item in dataDict.is_or_not"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="平台是否发证">
            <el-select
              v-model="searchForm.pla_is_certification"
              placeholder="平台是否发证"
            >
              <el-option
                v-for="item in dataDict.is_or_not"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="型号">
            <el-input
              v-model="searchForm.model"
              placeholder="型号"
            />
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

    <!-- 导入导出和表格 -->
    <el-row>
      <el-col :span="24">
        <!-- 导入导出 -->
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
              icon="el-icon-download"
              type="success"
              size="mini"
              style="margin-right: 10px"
              @click="handleBatchDownload"
            >文件批量下载</el-button>
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

        <!-- v-loading="listLoading" -->
        <el-table
          :data="tableData"
          element-loading-text="Loading"
          fit
          highlight-current-row
          max-height="630"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed type="selection" align="center" width="50" />
          <template v-for="item in tableHeaderList.filter(item => item.is_select)">
            <el-table-column
              v-if="TABLE_WIDTH.includes(item.name)"
              :key="item.zh_name"
              :label="item.zh_name"
              :width="getWidth(item)"
              class="text-column"
            >
              <template slot-scope="scope">
                <div :title="scope.row[item.name]" class="line-clamp-2">{{ scope.row[item.name] }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="['test_report', 'test_report_two', 'test_report_three'].includes(item.name)"
              :key="item.zh_name"
              :label="item.zh_name"
              :width="getWidth(item)"
              class="text-column"
            >
              <template slot-scope="scope">
                <div v-for="(name, index) in getString(scope.row[item.name])" :key="name +index">{{ name }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="item.name"
              :prop="item.name"
              :label="item.zh_name"
              :width="getWidth(item)"
            />
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
      :visible.sync="headerDialogVisible"
      width="60%"
      :before-close="handleCloseHeaderDialog"
      class="header-dialog"
    >
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedTableHeader" @change="handleCheckedChange">
        <el-checkbox v-for="item in tableHeaderList" :key="item.name" :label="item.name">{{ item.zh_name }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSetTableHeader">确 定</el-button>
        <el-button @click="cancelSetTableHeader">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 新增查看编辑弹窗表单 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="formDialogVisible"
      :before-close="handleClose"
      class="form-dialog"
      append-to-body
      top="1vh"
    >
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 1. PC外设基本信息 -->
        <el-collapse-item name="1">
          <template slot="title">
            <i :class="['el-icon-caret-right', {'rotate': isActive('1')}]" /> PC外设基本信息
          </template>
          <el-form ref="formRef1" :inline="false" :model="formData" label-width="70px" :rules="rules1">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="序号" label-width="40px">
                  <el-input
                    v-model="formData.serial_number"
                    :disabled="disabled"
                    placeholder="序号"
                    type="number"
                    class="no-arrow-number-input"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="品类" label-width="50px" prop="category">
                  <el-select v-model="formData.category" :disabled="disabled" placeholder="必填项">
                    <el-option
                      v-for="item in dataDict.category"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂商(送测商)" label-width="101px" prop="manufacturer">
                  <el-select
                    v-model="formData.manufacturer"
                    placeholder="必填项"
                    :disabled="disabled"
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
              <el-col :span="6">
                <el-form-item label="是否一体机" label-width="82px">
                  <el-select
                    v-model="formData.is_allinone"
                    placeholder="是否一体机"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_or_not"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支持功能">
                  <el-input
                    v-model="formData.support_function"
                    :disabled="disabled"
                    placeholder="支持功能"
                    type="textarea"
                    autosize
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="品牌" label-width="50px" prop="brand">
                  <el-input
                    v-model="formData.brand"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="系列型号">
                  <el-input
                    v-model="formData.series_model"
                    :disabled="disabled"
                    placeholder="系列型号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品功能">
                  <el-input
                    v-model="formData.product_function"
                    :disabled="disabled"
                    placeholder="产品功能"
                    type="textarea"
                    autosize
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="系列化发证类型（主测/扩展）" class="long-label" label-width="122px" prop="series_certification_type">
                  <el-input
                    v-model="formData.series_certification_type"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="品名(厂商认证申请)" label-width="134px">
                  <el-input
                    v-model="formData.product_name"
                    :disabled="disabled"
                    placeholder="品名(厂商认证申请)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号" label-width="40px">
                  <el-input
                    v-model="formData.model"
                    :disabled="disabled"
                    placeholder="型号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其他型号">
                  <el-input
                    v-model="formData.other_model"
                    :disabled="disabled"
                    placeholder="其他型号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <!-- 2. 任务详情 -->
        <el-collapse-item name="2">
          <template slot="title">
            <i :class="['el-icon-caret-right', {'rotate': isActive('2')}]" /> 任务详情
          </template>
          <el-form ref="formRef2" :inline="false" :model="formData" label-width="70px" :rules="rules2">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="实验室厂商接口人" label-width="134px" prop="test_manufacturer_user">
                  <el-input
                    v-model="formData.test_manufacturer_user"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="华为BD" label-width="62px">
                  <el-input
                    v-model="formData.huawei_bd"
                    :disabled="disabled"
                    placeholder="华为BD"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="转测试邮件" label-width="82px">
                  <el-input
                    v-model="formData.transfer_test_email"
                    :disabled="disabled"
                    placeholder="转测试邮件"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="计划样品送达时间" label-width="124px">
                  <el-date-picker
                    v-model="formData.plan_arrive_time"
                    type="datetime"
                    placeholder="计划样品送达时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="任务批次标签" label-width="96px">
                  <el-input
                    v-model="formData.task_tag"
                    :disabled="disabled"
                    placeholder="任务批次标签"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="需求唯一标识(B品类_C厂商_D品牌_F型号_AW转测轮次)"
                  label-width="193px"
                  class="long-label"
                >
                  <el-input
                    v-model="formData.sign"
                    :disabled="disabled"
                    placeholder="需求唯一标识(B品类_C厂商_D品牌_F型号_AW转测轮次)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="任务下发时间" label-width="106px" prop="task_send_time">
                  <el-date-picker
                    v-model="formData.task_send_time"
                    type="datetime"
                    placeholder="必填项"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="转测轮次(yyyyTN)" label-width="133px">
                  <el-input
                    v-model="formData.transfer_test_num"
                    :disabled="disabled"
                    placeholder="转测轮次(yyyyTN)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="要求报告发布时间(初始Deadline)"
                  label-width="124px"
                  class="long-label"
                >
                  <el-date-picker
                    v-model="formData.init_deadline"
                    type="datetime"
                    placeholder="要求报告发布时间(初始Deadline)"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="转测备注">
                  <el-input
                    v-model="formData.transfer_test_remark"
                    autosize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="转测备注"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否最新轮次" label-width="106px" prop="is_new">
                  <el-select
                    v-model="formData.is_new"
                    placeholder="必填项"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_or_not"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="任务批次" label-width="78px" prop="task_batch">
                  <el-input v-model="formData.task_batch" :disabled="disabled" placeholder="必填项" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="样品数量">
                  <el-input
                    v-model="formData.sample_num"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="样品数量"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最新deadline" label-width="100px">
                  <el-date-picker
                    v-model="formData.new_deadline"
                    type="datetime"
                    placeholder="最新deadline"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="实际样品送达日" label-width="120px" prop="arrive_time">
                  <el-date-picker
                    v-model="formData.arrive_time"
                    type="datetime"
                    placeholder="必填项"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="转测时间">
                  <el-date-picker
                    v-model="formData.transfer_test_time"
                    type="datetime"
                    placeholder="转测时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <!-- 3. 报告发布详情 -->
        <el-collapse-item name="3">
          <template slot="title">
            <i :class="['el-icon-caret-right', {'rotate': isActive('3')}]" /> 报告发布详情
          </template>
          <el-form ref="formRef3" :inline="false" :model="formData" label-width="70px" :rules="rules3">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="测试结论1" prop="test_conclusion" label-width="86px">
                  <el-input
                    v-model="formData.test_conclusion"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="测试结论2" label-width="78px">
                  <el-input
                    v-model="formData.test_conclusion_two"
                    :disabled="disabled"
                    placeholder="测试结论2"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="测试结论3" label-width="78px">
                  <el-input
                    v-model="formData.test_conclusion_three"
                    :disabled="disabled"
                    placeholder="测试结论3"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="测试人" label-width="64px" prop="test_user">
                  <el-input
                    v-model="formData.test_user"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="测试报告1" label-width="86px" prop="test_report">
                  <!-- <el-input
                    v-model="formData.test_report"
                    :disabled="disabled"
                    placeholder="必填项"
                  /> -->
                  <!--        -->
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="#"
                    accept=".xlsx,.xls"
                    :before-upload="beforeUploadTestReport"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-change="handleChangeTestReport"
                    :limit="5"
                    multiple
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :auto-upload="false"
                    :disabled="disabled"
                  >
                    <el-button size="small" type="primary">选择文件</el-button>
                    <el-button
                      size="small"
                      type="success"
                      icon="el-icon-upload"
                      :disabled="isDisabled"
                      style="margin-left: 10px"
                      @click.stop="submitUpload(fileList, 1)"
                    >
                      {{ uploading ? '上传中...' : '批量上传' }}
                    </el-button>
                    <div slot="tip" style="line-height: 20px;" class="el-upload__tip">选择文件后，请点击“批量上传”按钮进行上传</div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="测试报告2" label-width="76px">
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="#"
                    accept=".xlsx,.xls"
                    :before-upload="beforeUploadTestReport2"
                    :on-preview="handlePreview2"
                    :on-remove="handleRemove2"
                    :before-remove="beforeRemove2"
                    :on-change="handleChangeTestReport2"
                    :limit="5"
                    multiple
                    :on-exceed="handleExceed2"
                    :file-list="fileList2"
                    :auto-upload="false"
                    :disabled="disabled"
                  >
                    <el-button size="small" type="primary">选择文件</el-button>
                    <el-button
                      size="small"
                      type="success"
                      icon="el-icon-upload"
                      :disabled="isDisabled2"
                      style="margin-left: 10px"
                      @click.stop="submitUpload(fileList2, 2)"
                    >
                      {{ uploading2 ? '上传中...' : '批量上传' }}
                    </el-button>
                    <div slot="tip" style="line-height: 20px;" class="el-upload__tip">选择文件后，请点击“批量上传”按钮进行上传</div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="测试报告3" label-width="76px">
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="#"
                    accept=".xlsx,.xls"
                    :before-upload="beforeUploadTestReport3"
                    :on-preview="handlePreview3"
                    :on-remove="handleRemove3"
                    :before-remove="beforeRemove3"
                    :on-change="handleChangeTestReport3"
                    :limit="5"
                    multiple
                    :on-exceed="handleExceed3"
                    :file-list="fileList3"
                    :auto-upload="false"
                    :disabled="disabled"
                  >
                    <el-button size="small" type="primary">选择文件</el-button>
                    <el-button
                      size="small"
                      type="success"
                      icon="el-icon-upload"
                      :disabled="isDisabled3"
                      style="margin-left: 10px"
                      @click.stop="submitUpload(fileList3, 3)"
                    >
                      {{ uploading3 ? '上传中...' : '批量上传' }}
                    </el-button>
                    <div slot="tip" style="line-height: 20px;" class="el-upload__tip">选择文件后，请点击“批量上传”按钮进行上传</div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报告发布邮件" label-width="96px">
                  <el-input
                    v-model="formData.report_publish_email"
                    :disabled="disabled"
                    placeholder="报告发布邮件"
                  />
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="致命问题数" label-width="92px" prop="too_high">
                  <el-input
                    v-model="formData.too_high"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="致命问题数2" label-width="92px">
                  <el-input
                    v-model="formData.too_high_two"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="致命问题数2"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="致命问题数3" label-width="92px">
                  <el-input
                    v-model="formData.too_high_three"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="致命问题数3"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报告评审日(报告名前缀)" label-width="93px" class="long-label">
                  <el-date-picker
                    v-model="formData.report_date"
                    type="datetime"
                    placeholder="报告评审日(报告名前缀)"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="严重问题数" label-width="92px" prop="high">
                  <el-input
                    v-model="formData.high"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="严重问题数2" label-width="92px">
                  <el-input
                    v-model="formData.high_two"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="严重问题数2"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="严重问题数3" label-width="92px">
                  <el-input
                    v-model="formData.high_three"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="严重问题数3"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="初稿报告发布时间" label-width="124px">
                  <el-date-picker
                    v-model="formData.init_publish_time"
                    type="datetime"
                    placeholder="初稿报告发布时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="一般问题数" label-width="92px" prop="low">
                  <el-input
                    v-model="formData.low"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="一般问题数2" label-width="92px">
                  <el-input
                    v-model="formData.low_two"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="一般问题数2"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="一般问题数3" label-width="92px">
                  <el-input
                    v-model="formData.low_three"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="一般问题数3"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="终版报告发布时间" label-width="124px">
                  <el-date-picker
                    v-model="formData.publish_time"
                    type="datetime"
                    placeholder="终版报告发布时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="提示问题数" label-width="92px" prop="warn">
                  <el-input
                    v-model="formData.warn"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="必填项"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提示问题数2" label-width="92px">
                  <el-input
                    v-model="formData.warn_two"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="提示问题数2"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提示问题数3" label-width="92px">
                  <el-input
                    v-model="formData.warn_three"
                    class="no-arrow-number-input"
                    type="number"
                    :disabled="disabled"
                    placeholder="提示问题数3"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="报告备注1" label-width="76px">
                  <el-input
                    v-model="formData.report_remark"
                    autosize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="报告备注1"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报告备注2" label-width="76px">
                  <el-input
                    v-model="formData.report_remark_two"
                    autosize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="报告备注2"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报告备注3" label-width="76px">
                  <el-input
                    v-model="formData.report_remark_three"
                    autosize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="报告备注3"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <!-- 4. 外设发证详情 -->
        <el-collapse-item name="4">
          <template slot="title">
            <i :class="['el-icon-caret-right', {'rotate': isActive('4')}]" /> 外设发证详情
          </template>
          <el-form ref="formRef4" :rules="rules4" :inline="false" :model="formData" label-width="70px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="发证评审日" label-width="82px">
                  <el-date-picker
                    v-model="formData.certification_date"
                    type="datetime"
                    placeholder="发证评审日"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="阻塞发证厂商问题状态" label-width="162px" prop="is_certification">
                  <el-select
                    v-model="formData.is_certification"
                    placeholder="必填项"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_certification"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证评审备注" label-width="96px">
                  <el-input
                    v-model="formData.certification_remark"
                    aotusize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="发证评审备注"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="发证评审日2" label-width="90px">
                  <el-date-picker
                    v-model="formData.certification_date_two"
                    type="datetime"
                    placeholder="发证评审日2"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证状态2" label-width="76px">
                  <el-select
                    v-model="formData.is_certification_two"
                    placeholder="发证状态2"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_certification"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证评审备注2" label-width="104px">
                  <el-input
                    v-model="formData.certification_remark_two"
                    aotusize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="发证评审备注2"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="发证评审日3" label-width="90px">
                  <el-date-picker
                    v-model="formData.certification_date_three"
                    type="datetime"
                    placeholder="发证评审日3"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证状态3" label-width="76px">
                  <el-select
                    v-model="formData.is_certification_three"
                    placeholder="发证状态3"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_certification"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证评审备注3" label-width="104px">
                  <el-input
                    v-model="formData.certification_remark_three"
                    aotusize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="发证评审备注3"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="发证评审日4" label-width="90px">
                  <el-date-picker
                    v-model="formData.certification_date_four"
                    type="datetime"
                    placeholder="发证评审日4"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证状态4" label-width="76px">
                  <el-select
                    v-model="formData.is_certification_four"
                    placeholder="发证状态4"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_certification"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证评审备注4" label-width="104px">
                  <el-input
                    v-model="formData.certification_remark_four"
                    aotusize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="发证评审备注4"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="发证评审日5" label-width="90px">
                  <el-date-picker
                    v-model="formData.certification_date_five"
                    type="datetime"
                    placeholder="发证评审日5"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证状态5" label-width="76px">
                  <el-select
                    v-model="formData.is_certification_five"
                    placeholder="发证状态5"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_certification"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证评审备注5" label-width="104px">
                  <el-input
                    v-model="formData.certification_remark_five"
                    aotusize
                    type="textarea"
                    :disabled="disabled"
                    placeholder="发证评审备注5"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="平台是否发证" label-width="96px">
                  <el-select
                    v-model="formData.pla_is_certification"
                    placeholder="平台是否发证"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_or_not"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证书编号">
                  <el-input
                    v-model="formData.certification_number"
                    placeholder="证书编号"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否涉及豁免" label-width="96px">
                  <el-select
                    v-model="formData.is_exempt"
                    placeholder="是否涉及豁免"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_or_not"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="适配鸿蒙系统版本" label-width="124px">
                  <el-input
                    v-model="formData.harmonyos_sys_version"
                    placeholder="适配鸿蒙系统版本"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司名" label-width="54px">
                  <el-input
                    v-model="formData.company_name"
                    placeholder="公司名"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="未申请但测试通过（产品未上市）" class="long-label" label-width="124px">
                  <el-input
                    v-model="formData.no_apply_for_but_pass"
                    placeholder="未申请但测试通过（产品未上市）"
                    :disabled="disabled"
                    type="textarea"
                    autosize
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="驱动版本">
                  <el-input
                    v-model="formData.drive_version"
                    placeholder="驱动版本"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="认证实验室" label-width="82px">
                  <el-input
                    v-model="formData.certified_laboratory"
                    placeholder="认证实验室"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发证时间">
                  <el-date-picker
                    v-model="formData.certification_time"
                    type="datetime"
                    placeholder="发证时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <!-- 5. 转测详情 -->
        <el-collapse-item name="5">
          <template slot="title">
            <i :class="['el-icon-caret-right', {'rotate': isActive('5')}]" /> 转测详情
          </template>
          <el-form ref="formRef5" :inline="false" :model="formData" label-width="70px" :rules="rules5">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="驱动" label-width="40px">
                  <el-input
                    v-model="formData.drive"
                    placeholder="驱动"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="软件配网">
                  <el-input
                    v-model="formData.soft_network"
                    placeholder="软件配网"
                    :disabled="disabled"
                    type="textarea"
                    autosize
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="硬件配网">
                  <el-input
                    v-model="formData.hardware_network"
                    placeholder="硬件配网"
                    :disabled="disabled"
                    type="textarea"
                    autosize
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="自检checklist" label-width="100px">
                  <el-input
                    v-model="formData.self_check"
                    placeholder="自检checklist"
                    :disabled="disabled"
                    type="textarea"
                    autosize
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="转测试状态" label-width="82px">
                  <el-input
                    v-model="formData.transfer_test_status"
                    placeholder="转测试状态"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="驱动下载方式（应用市场/受邀测试/应用尝鲜）" label-width="162px" class="long-label" prop="drive_download_method">
                  <el-input
                    v-model="formData.drive_download_method"
                    placeholder="必填项"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="上架驱动名称" label-width="96px">
                  <el-input
                    v-model="formData.drive_name"
                    placeholder="上架驱动名称"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否已有平台账号" label-width="124px">
                  <el-select
                    v-model="formData.is_pla_account"
                    placeholder="是否已有平台账号"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_or_not"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否已提交认证申请" label-width="139px">
                  <el-select
                    v-model="formData.is_submit"
                    placeholder="是否已提交认证申请"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.is_or_not"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="驱动版本号" label-width="92px" prop="drive_version_number">
                  <el-input
                    v-model="formData.drive_version_number"
                    placeholder="必填项"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="测试地点" label-width="78px" prop="test_addr">
                  <el-input
                    v-model="formData.test_addr"
                    placeholder="必填项"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际测试机型" label-width="96px">
                  <el-input
                    v-model="formData.test_model"
                    placeholder="实际测试机型"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <!-- 6. 测试详情 -->
        <el-collapse-item name="6">
          <template slot="title">
            <i :class="['el-icon-caret-right', {'rotate': isActive('6')}]" /> 测试详情
          </template>
          <el-form ref="formRef6" :inline="false" :model="formData" label-width="70px" :rules="rules6">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="测试状态" label-width="78px" prop="test_status">
                  <el-select
                    v-model="formData.test_status"
                    placeholder="必填项"
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="item in dataDict.test_status"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="测试开始时间" label-width="106px" prop="test_start_time">
                  <el-date-picker
                    v-model="formData.test_start_time"
                    type="datetime"
                    placeholder="必填项"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小组" label-width="40px">
                  <el-input
                    v-model="formData.less_group"
                    placeholder="小组"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="测试大类">
                  <el-input
                    v-model="formData.test_type"
                    placeholder="测试大类"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="计划测试完成时间" label-width="124px">
                  <el-date-picker
                    v-model="formData.plan_test_finish_time"
                    type="datetime"
                    placeholder="计划测试完成时间"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小组长" label-width="54px">
                  <el-input
                    v-model="formData.less_group_leader"
                    placeholder="小组长"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="测试小类">
                  <el-input
                    v-model="formData.test_sub_type"
                    placeholder="测试小类"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="预计完成时间(今天及以后)" label-width="96px" class="long-label">
                  <el-date-picker
                    v-model="formData.plan_finish_time"
                    type="datetime"
                    placeholder="预计完成时间(今天及以后)"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工作量占比" label-width="82px">
                  <el-input
                    v-model="formData.account_for_work"
                    placeholder="工作量占比"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="一级小类">
                  <el-input
                    v-model="formData.one_sub_type"
                    placeholder="一级小类"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="测试完成时间" label-width="106px" prop="test_finish_time">
                  <el-date-picker
                    v-model="formData.test_finish_time"
                    type="datetime"
                    placeholder="必填项"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出报告日期" label-width="82px">
                  <el-date-picker
                    v-model="formData.report_out_date"
                    type="datetime"
                    placeholder="出报告日期"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二级小类">
                  <el-input
                    v-model="formData.two_sub_type"
                    placeholder="二级小类"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="内部备注">
                  <el-input
                    v-model="formData.in_remark"
                    autsize
                    type="textarea"
                    placeholder="内部备注"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出报告周次" label-width="82px">
                  <el-input
                    v-model="formData.report_out_week"
                    placeholder="出报告周次"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="三级小类">
                  <el-input
                    v-model="formData.three_sub_type"
                    placeholder="三级小类"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="品名校准记录" label-width="96px">
                  <el-input
                    v-model="formData.record"
                    placeholder="品名校准记录"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出报告月份" label-width="82px">
                  <el-input
                    v-model="formData.report_out_month"
                    placeholder="出报告月份"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="四级小类">
                  <el-input
                    v-model="formData.four_sub_type"
                    placeholder="四级小类"
                    :disabled="disabled"
                  />
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
  </div>
</template>

<script>
import {
  getExcelData,
  getExcelHeader,
  saveOrUpdateData,
  deleteData,
  importExcel,
  exportExcel,
  getDataDict,
  saveHeaderConfig,
  uploadFiles,
  downloadFiles
} from '@/api/form'
import { DATE_TIME_DATA, INT_DATA, TABLE_WIDTH } from '@/utils/constants'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default {
  filters: {},
  data() {
    // 自定义校验规则：检查 fileList 是否有文件
    const validateFileUpload = (rule, value, callback) => {
      if (!this.formData.test_report || this.formData.test_report.length === 0) {
        callback(new Error('请点击“批量上传”按钮进行上传'))
      } else {
        callback() // 校验通过
      }
    }
    return {
      list: [],
      listLoading: true,
      searchForm: {
        category: '',
        manufacturer: '',
        is_certification: '',
        is_new: '',
        test_status: '',
        test_conclusion: '',
        pla_is_certification: '',
        model: ''
      },
      isShowSearch: true,
      checkedFields: [],
      tableData: [],
      // 分页信息
      pageinfo: {
        page: 1,
        size: 10,
        total: 0
      },
      tableHeaderList: [],
      formDialogVisible: false,
      headerDialogVisible: false,
      formData: {},
      dialogTitle: '新增',
      disabled: false,
      currentEditID: null,
      fileUrl: '',
      fileNameList: [],
      excelId: null,
      currentExcel: {},
      DATE_TIME_DATA,
      rowVision: null,
      dataDict: {},
      ids: [],
      activeNames: ['1'],
      checkAll: false,
      isIndeterminate: true,
      checkedTableHeader: [],
      rules1: {
        category: [{ required: true, message: '必填项', trigger: 'blur' }],
        manufacturer: [{ required: true, message: '必填项', trigger: 'change' }],
        brand: [{ required: true, message: '必填项', trigger: 'blur' }],
        series_certification_type: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      rules2: {
        task_send_time: [{ required: true, message: '必填项', trigger: 'blur' }],
        is_new: [{ required: true, message: '必填项', trigger: 'change' }],
        arrive_time: [{ required: true, message: '必填项', trigger: 'blur' }],
        test_manufacturer_user: [{ required: true, message: '必填项', trigger: 'blur' }],
        task_batch: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      rules3: {
        test_conclusion: [{ required: true, message: '必填项', trigger: 'blur' }],
        test_user: [{ required: true, message: '必填项', trigger: 'blur' }],
        too_high: [{ required: true, message: '必填项', trigger: 'blur' }],
        high: [{ required: true, message: '必填项', trigger: 'blur' }],
        low: [{ required: true, message: '必填项', trigger: 'blur' }],
        warn: [{ required: true, message: '必填项', trigger: 'blur' }],
        test_report: [{ required: true, validator: validateFileUpload, trigger: 'change' }]
      },
      rules4: {
        is_certification: [{ required: true, message: '必填项', trigger: 'change' }]
      },
      rules5: {
        drive_download_method: [{ required: true, message: '必填项', trigger: 'blur' }],
        drive_version_number: [{ required: true, message: '必填项', trigger: 'blur' }],
        test_addr: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      rules6: {
        test_status: [{ required: true, message: '必填项', trigger: 'change' }],
        test_start_time: [{ required: true, message: '必填项', trigger: 'blur' }],
        test_finish_time: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      TABLE_WIDTH,
      fileList: [],
      uploading: false,
      fileList2: [],
      uploading2: false,
      fileList3: [],
      uploading3: false
    }
  },
  computed: {
    isDisabled() {
      return this.fileList.length === 0 ||
      this.uploading || this.disabled ||
      this.fileList.every(file => file.status === 'success')
    },
    isDisabled2() {
      return this.fileList2.length === 0 ||
      this.uploading2 || this.disabled ||
      this.fileList2.every(file => file.status === 'success')
    },
    isDisabled3() {
      return this.fileList3.length === 0 ||
      this.uploading3 || this.disabled ||
      this.fileList3.every(file => file.status === 'success')
    }
  },
  async created() {
    await this.fetchDataDict()
    await this.fetchExcelHeader()
    await this.fetchExcelData()
  },
  methods: {
    handleBatchDownload() {
      this.listLoading = true
      const data = this.getExportExcelData()
      console.log('批量下载:', data)

      downloadFiles(data)
        .then((response) => {
          console.log(response)
          this.downloadExcel(response)
        })
        .catch((error) => {
          console.error('批量下载错误:', error)
          this.$message.error('批量下载失败')
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    // 3
    handleChangeTestReport3(file, fileList) {
      this.fileList3 = fileList
      console.log(this.fileList3, 'handleChangeTestReport3')
    },

    // 文件类型校验
    beforeUploadTestReport3(file) {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
      ]
      const isExcel = allowedTypes.includes(file.type)
      if (!isExcel) {
        this.$message.error('只能上传 Excel 文件（.xlsx 或 .xls）!')
      }
      return isExcel
    },

    // 超出数量限制提示
    handleExceed3(files, fileList) {
      this.$message.warning(`最多上传 5 个文件，当前共 ${files.length + fileList.length} 个`)
    },

    // 移除文件确认
    beforeRemove3(file, fileList) {
      if (file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
      return true
    },

    handlePreview3(file) {
      console.log('预览文件:', file)
    },

    handleRemove3(file, fileList) {
      console.log('已移除:', file.name)
      this.fileList3 = fileList
      this.formData.test_report_three = this.fileList3.map(file => {
        return {
          filename: file.name,
          file_path: file.url
        }
      })
      console.log('当前文件列表:', this.fileList3, this.formData.test_report_three)
    },
    // 2
    handleChangeTestReport2(file, fileList) {
      this.fileList2 = fileList
      console.log(this.fileList2, 'handleChangeTestReport2')
    },

    // 文件类型校验
    beforeUploadTestReport2(file) {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
      ]
      const isExcel = allowedTypes.includes(file.type)
      if (!isExcel) {
        this.$message.error('只能上传 Excel 文件（.xlsx 或 .xls）!')
      }
      return isExcel
    },

    // 超出数量限制提示
    handleExceed2(files, fileList) {
      this.$message.warning(`最多上传 5 个文件，当前共 ${files.length + fileList.length} 个`)
    },

    // 移除文件确认
    beforeRemove2(file, fileList) {
      if (file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
      return true
    },

    handlePreview2(file) {
      console.log('预览文件:', file)
    },

    handleRemove2(file, fileList) {
      console.log('已移除:', file.name)
      this.fileList2 = fileList
      this.formData.test_report_two = this.fileList2.map(file => {
        return {
          filename: file.name,
          file_path: file.url
        }
      })
      console.log('当前文件列表:', this.fileList2, this.formData.test_report_two)
    },
    // 1
    handleChangeTestReport(file, fileList) {
      this.fileList = fileList
      console.log(this.fileList, 'handleChangeTestReport')
    },

    // 文件类型校验
    beforeUploadTestReport(file) {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
      ]
      const isExcel = allowedTypes.includes(file.type)
      if (!isExcel) {
        this.$message.error('只能上传 Excel 文件（.xlsx 或 .xls）!')
      }
      return isExcel
    },

    // 超出数量限制提示
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 5 个文件，当前共 ${files.length + fileList.length} 个`)
    },

    // 移除文件确认
    beforeRemove(file, fileList) {
      if (file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
      return true
    },

    handlePreview(file) {
      console.log('预览文件:', file)
    },

    handleRemove(file, fileList) {
      console.log('已移除:', file.name)
      this.fileList = fileList
      this.formData.test_report = this.fileList.map(file => {
        return {
          filename: file.name,
          file_path: file.url
        }
      })
      console.log('当前文件列表:', this.fileList, this.formData.test_report)
    },

    // ✅ 核心：批量上传
    async submitUpload(fileList, num) {
      if (fileList.every(file => file.status === 'success')) {
        return
      }
      // 动态映射 num → loading 变量名 和 formData 字段名
      const config = {
        1: { loading: 'uploading', field: 'test_report' },
        2: { loading: 'uploading2', field: 'test_report_two' },
        3: { loading: 'uploading3', field: 'test_report_three' }
      }
      console.log('上传文件列表:', fileList, '配置:', config[num])

      const { loading, field } = config[num]

      // 设置 loading 状态（动态）
      this[loading] = true

      const formData = new FormData()
      fileList.forEach(file => {
        if (file.status === 'success') {
          return // 已经上传成功的文件不再处理
        }
        formData.append('files', file.raw || file)
      })

      try {
        const res = await uploadFiles(formData)
        if (res.code === 200) {
          this.$message.success('文件上传成功')
          // 动态更新 formData 字段
          this.formData[field] = this.formData[field].concat(res.data)

          // 标记文件状态
          fileList.forEach(file => {
            file.status = 'success'
          })
        } else {
          this.$message.error(res.message || '上传失败')
        }
      } catch (error) {
        console.error('上传失败:', error)
        this.$message.error('上传失败')
      } finally {
        // 关闭 loading（动态）
        this[loading] = false
      }
    },
    getWidth(item) {
      const widthRules = [
        { keys: ['sign'], width: '380px' },
        { keys: ['init_deadline', 'series_certification_type'], width: '240px' },
        { keys: [...TABLE_WIDTH], width: '400px' },
        { keys: ['drive_download_method', 'test_report', 'test_report_two', 'test_report_three'], width: '310px' },
        { keys: ['plan_finish_time'], width: '200px' },
        { keys: ['problem_number', 'is_certification', ...DATE_TIME_DATA], width: '180px' },
        { keys: ['product_name', 'model'], width: '170px' },
        { keys: ['is_submit', 'test_user'], width: '155px' },
        { keys: ['task_tag', 'is_pla_account', 'harmonyos_sys_version', 'test_manufacturer_user', 'transfer_test_num'], width: '145px' },
        { keys: ['manufacturer', 'drive_name', 'test_model', 'pla_is_certification', 'is_exempt', 'record', 'is_new', 'report_publish_email'], width: '110px' }
      ]

      const defaultWidth = '95px'

      for (const rule of widthRules) {
        if (rule.keys.includes(item.name)) {
          return rule.width
        }
      }

      return defaultWidth
    },
    handleChange(val) {
      console.log(val)
      this.activeNames = val
    },
    isActive(name) {
      // 判断当前项是否处于激活状态
      if (Array.isArray(this.activeNames)) {
        return this.activeNames.includes(name)
      } else {
        return this.activeNames === name
      }
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
    handleMenuSelect(index) {
      console.log(index)
      this.currentExcel = this.fileNameList[index]
    },
    handleOpenMenu(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCloseMenu(key, keyPath) {
      console.log(key, keyPath)
    },
    downloadExcel(response) {
      console.log(response, 'downloadExcel')

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
      const type = response.data.type

      const blob = new Blob([response.data], {
        // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        type
      })

      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      this.listLoading = false
      const msg = type === 'application/zip' ? '批量下载成功' : '导出成功'
      this.$message.success(msg)
    },
    exportToExcel() {
      this.listLoading = true
      const data = this.getExportExcelData()
      console.log('导出参数:', data)

      exportExcel(data)
        .then((response) => {
          console.log(response)
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
        category: this.searchForm.category,
        manufacturer: this.searchForm.manufacturer,
        test_status: this.searchForm.test_status,
        is_new: this.searchForm.is_new,
        is_certification: this.searchForm.is_certification,
        test_conclusion: this.searchForm.test_conclusion,
        pla_is_certification: this.searchForm.pla_is_certification,
        model: this.searchForm.model,
        ids: this.ids
      }
      return data
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id)
      console.log(this.ids)
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
          // console.log('导入结果:', res.data)
          this.listLoading = false
          this.$message.success('导入成功')
          const params = this.getFetchDataParams()
          await this.fetchExcelData(params) // 刷新列表
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
      this.fileUrl = URL.createObjectURL(file.raw)
      console.log(this.fileUrl, 'this.fileUrl')
    },
    clearObjectValues(obj) {
      Object.keys(obj).forEach((key) => {
        obj[key] = ''
      })
      return obj
    },
    reset() {
      if (this.dialogTitle !== '查看') {
        const refs = ['formRef1', 'formRef2', 'formRef3', 'formRef4', 'formRef5', 'formRef6']
        refs.forEach(refName => {
          const formRef = this.$refs[refName]
          if (formRef && typeof formRef.resetFields === 'function') {
            formRef.resetFields()
          }
        })
      }
      this.fileList = []
      this.fileList2 = []
      this.fileList3 = []
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
    // 对象处理
    formatDateTimeFieldsForObject(data) {
      const result = { ...data }
      for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue
        if (DATE_TIME_DATA.includes(key)) {
          result[key] = data[key]
            ? dayjs(data[key]).format('YYYY-MM-DD HH:mm:ss')
            : null
        } else if (INT_DATA.includes(key)) {
          const value = data[key]
          const num = Number(value)
          result[key] = isNaN(num) ? null : num
        }
      }
      return result
    },
    // 数组处理
    formatFormData(data) {
      return data.map((item) => {
        const newItem = { ...item }
        Object.keys(item).forEach((key) => {
          if (DATE_TIME_DATA.includes(key)) {
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
    /**
     * 新增或编辑提交操作
     */
    addOrEditSubmit() {
      if (this.uploading || this.uploading2 || this.uploading3) {
        this.$message.warning('请等待文件上传完成后再提交')
        return
      }

      const refs = ['formRef1', 'formRef2', 'formRef3', 'formRef4', 'formRef5', 'formRef6']
      const promises = refs.map(refName =>
        new Promise(resolve => {
          this.$refs[refName].validate(valid => {
            resolve(valid)
          })
        })
      )

      Promise.all(promises).then(results => {
        console.log(results, '所有表单校验结果')

        if (results.every(valid => valid)) {
          console.log('✅ 所有表单都校验通过，可以提交数据')
          const data = this.formatDateTimeFieldsForObject(this.formData)
          if (this.dialogTitle === '编辑') {
            data.row_vision = this.rowVision
          }
          if (!data.test_report_two) {
            data.test_report_two = []
          }
          if (!data.test_report_three) {
            data.test_report_three = []
          }
          console.log(data, 'data')
          saveOrUpdateData({ data, id: this.currentEditID }).then(async(response) => {
            this.formDialogVisible = false
            this.dialogTitle === '新增'
              ? this.$message.success('新增成功')
              : this.$message.success('编辑成功')
            this.formData = this.clearObjectValues(this.formData)
            const params = this.getFetchDataParams()
            await this.fetchExcelData(params)
            this.reset()
          })
        } else {
          this.$message.error('请检查表单内容，有必填项为空')
          const invalidRefs = refs.filter((refName, index) => !results[index])
          console.log('❌ 以下表单校验未通过:', invalidRefs)
          this.activeNames = invalidRefs.map(ref => ref.replace(/\D+/g, ''))
        }
      })
    },
    // findAllFalseIndices(arr) {
    //   return arr
    //     .map((value, index) => (value === false ? index : undefined))
    //     .filter(value => value !== undefined)
    //     .map(index => (index > 2 ? index + 2 : index + 1))
    //     .map(String)
    // },
    async fetchExcelHeader() {
      try {
        const response = await getExcelHeader()
        console.log(response, '获取表头')
        const arr = ['test_report', 'test_report_two', 'test_report_three']
        this.tableHeaderList = response.data
        this.formData = response.data.reduce((obj, item) => {
          if (arr.includes(item.name)) {
            obj[item.name] = []
          } else {
            obj[item.name] = ''
          }
          return obj
        }, {})
      } catch (error) {
        console.error('获取Excel表头失败:', error)
      } finally {
        this.listLoading = false
      }
    },
    async submitSetTableHeader() {
      // 发请求
      this.listLoading = true
      if (this.checkAll) {
        this.tableHeaderList.forEach(item => {
          item.is_select = true
        })
      } else {
        this.tableHeaderList.forEach(item => {
          item.is_select = this.checkedTableHeader.includes(item.name)
        })
      }
      try {
        await saveHeaderConfig(this.tableHeaderList)
        this.$message.success('保存成功')
        await this.fetchExcelHeader()
        this.headerDialogVisible = false
      } catch (error) {
        throw new Error(error.message)
      } finally {
        this.listLoading = false
      }
    },
    cancelSetTableHeader() {
      this.headerDialogVisible = false
    },
    handleCheckAllChange(val) {
      console.log(val, 'handleCheckAllChange')

      this.checkedTableHeader = val
        ? this.tableHeaderList.map(item => item.name) : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      console.log(value, 'handleCheckedChange')
      const checkedCount = value.length
      this.checkAll = checkedCount === this.tableHeaderList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableHeaderList.length
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
        .then((_) => {
          this.reset()
          done()
        })
        .catch((_) => {})
    },
    setTableHeader() {
      this.checkedTableHeader = this.tableHeaderList
        .filter(item => item.is_select)
        .map(item => item.name)
      this.headerDialogVisible = true
    },
    getFetchDataParams() {
      const params = {
        size: this.pageinfo.size,
        page: this.pageinfo.page,
        category: this.searchForm.category,
        manufacturer: this.searchForm.manufacturer,
        test_status: this.searchForm.test_status,
        is_new: this.searchForm.is_new,
        is_certification: this.searchForm.is_certification,
        test_conclusion: this.searchForm.test_conclusion,
        pla_is_certification: this.searchForm.pla_is_certification,
        model: this.searchForm.model
      }
      return params
    },
    async fetchExcelData(params) {
      try {
        this.listLoading = true
        const response = await getExcelData(params)
        console.log(response, 'getExcelData')
        this.tableData = this.formatFormData(response.data.data)
        this.pageinfo.size = response.data.size
        this.pageinfo.page = response.data.page
        this.pageinfo.total = response.data.total
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        this.listLoading = false
      }
    },
    async onSubmit() {
      this.pageinfo.page = 1
      const params = this.getFetchDataParams()
      console.log('submit!', params)
      await this.fetchExcelData(params)
    },
    resetForm() {
      this.searchForm = {
        category: '',
        manufacturer: '',
        is_certification: '',
        is_new: '',
        test_status: '',
        test_conclusion: '',
        pla_is_certification: '',
        model: ''
      }
    },
    handleCheck(value, header) {
      // this.$set(this.checkedItems, header, value)
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
            await this.fetchExcelData(params)
          })
        })
        .catch(() => {})
    },
    /**
     * 处理格式：将 row 中的文件数据格式化为 el-upload 所需的 fileList 结构
     */
    fileListFormatFormData(row) {
      // 格式化单个文件字段为 { name, url, status }
      const formatFileList = (data) => {
        if (!data) return []
        const list = Array.isArray(data) ? data : [data]
        return list.map(item => ({
          name: item.filename,
          url: item.file_path,
          status: 'success'
        }))
      }

      // 分别赋值
      this.fileList = formatFileList(row.test_report)
      this.fileList2 = formatFileList(row.test_report_two)
      this.fileList3 = formatFileList(row.test_report_three)
    },
    /**
     * 处理对话框点击事件
     * @param title 对话框标题
     * @param row
     */
    handleClick(title, row) {
      console.log(row)
      this.dialogTitle = title
      if (title === '编辑') {
        this.assignSameKeys(row)
        this.disabled = false
        this.currentEditID = row.id
        this.rowVision = row.row_vision
        this.fileListFormatFormData(row)
      } else if (title === '查看') {
        this.assignSameKeys(row)
        this.fileListFormatFormData(row)
        this.disabled = true
      } else {
        this.disabled = false
        this.currentEditID = null
        this.rowVision = null
        this.fileList = []
        this.fileList2 = []
        this.fileList3 = []
      }
      this.formDialogVisible = true
    },
    /** 切换每页显示条数 */
    async handleSizeChange(val) {
      const params = this.getFetchDataParams()
      params.size = val
      await this.fetchExcelData(params)
    },
    /** 切换分页 */
    async handleCurrentChange(val) {
      const params = this.getFetchDataParams()
      params.page = val
      await this.fetchExcelData(params)
    },
    getString(names) {
      if (!names || names.length === 0) {
        return ''
      }
      return names.map(item => item.filename)
    },
    /**
     *
     * @param source 目标源数据
     */
    assignSameKeys(source) {
      const arrayFields = ['test_report', 'test_report_two', 'test_report_three']

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
          const value = source[key]
          // 如果是数组字段，直接赋值，不 toString
          if (arrayFields.includes(key)) {
            this.formData[key] = Array.isArray(value) ? value : (value ? [value] : [])
          } else if (!value && value !== 0) {
            this.formData[key] = ''
          } else {
            this.formData[key] = value.toString()
          }
        }
      }
    }
    // assignSameKeys(source) {
    //   for (const key in source) {
    //     if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
    //       if (!source[key] && source[key] !== 0) {
    //         this.formData[key] = ''
    //       } else {
    //         this.formData[key] = source[key].toString()
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
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
      width: 100%;
      margin-top: 20px;

      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        line-height: 1.4;
        max-height: 2.8em;
        cursor: pointer;
      }
    }

    .el-menu-item {
      width: 100%;
      overflow: hidden;
    }
  }

  .search-form {
    margin-bottom: 30px;
  }

  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    // margin-left: 10px;

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

      .el-collapse {
        .el-collapse-item__content {
          padding-bottom: 0;
        }

        .el-collapse-item__arrow {
          display: none;
        }

        .rotate {
          transform: rotate(90deg); /* 旋转90度，使箭头朝下 */
          transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
        }

        .el-icon-caret-right {
          margin-right: 5px;
          margin-left: -6px;
          transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
        }
      }

      .el-form {
        &-item {
          margin-bottom: 18px;
        }
      }

    }

    .el-select {
      width: 100%;
    }

    .long-label {
      .el-form-item__label {
        line-height: 20px;
      }
    }
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
